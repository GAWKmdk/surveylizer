Template.signIn.helpers({
    "emailHasError": function(){
        return Session.get("emailHasError") ? "has-error" : "";
    },
    "passwordHasError": function(){
        return Session.get("passwordHasError") ? "has-error" : "";
    },
    "hasErrors": function(){
        return Session.get("errorMessage") ? true : false;
    },
    "errors": function(){
        return Session.get("errorMessage");
    },
    "success": function(){
        return Session.get("success");
    }
});

Template.signIn.events({
    "submit #sign-in-form": function(e, t){
        e.preventDefault();

        // Get email and password values
        var email = t.find("#sign-in-email").value,
        password = t.find("#sign-in-password").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("emailHasError", null);
        Session.set("passwordHasError", null);

        // Trim fields
        email = trimInput(email);
        password = trimInput(password);

        // Validate email field
        try{
            check(email, checkEmail);
        } catch(e) {
            Session.set("emailHasError", true);
            Session.set("errorMessage", "Please provide a proper email.");
            return false;
        }

        // Validate password field
        try{
            check(password, nonEmptyString);
        } catch(e) {
            Session.set("passwordHasError", true);
            Session.set("errorMessage", "Please provide a proper password.");
            return false;
        }

        // If valid input provided, attempt Sign In with credentials
        Meteor.loginWithPassword(email, password, function(err){
            // Check if error has occured
            if(err){
                Session.set("emailHasError", "Incorrect");
                Session.set("passwordHasError", "Incorrect");
                Session.set("errorMessage", "The email/password combination is incorrect.");
            } else {
                // Move the user to main page
                Router.go("/");
            }
        });

        // Prevent form reload
        return false;
    }
});
