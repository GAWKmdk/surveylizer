Template.signIn.onCreated(function(){
    if(Session.get("language")){
        i18n.setLanguage(Session.get("language"));
        moment.locale(Session.get("language"));
    } else {
        Session.set("language", "am");
        i18n.setLanguage("am");
        moment.locale("am");
    }
});

Template.signIn.onRendered(function(){
    $.material.init();
});

Template.signIn.helpers({
    "usernameHasError": function(){
        return Session.get("usernameHasError") ? "has-error" : "";
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

        // Get username and password values
        var username = t.find("#sign-in-username").value,
        password = t.find("#sign-in-password").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("usernameHasError", null);
        Session.set("passwordHasError", null);

        // Trim fields
        username = trimInput(username);
        password = trimInput(password);

        // Validate username field
        try{
            check(username, nonEmptyString);
        } catch(e) {
            Session.set("usernameHasError", true);
            Session.set("errorMessage", i18n('provideUsernameMessage'));
            return false;
        }

        // Validate password field
        try{
            check(password, nonEmptyString);
        } catch(e) {
            Session.set("passwordHasError", true);
            Session.set("errorMessage", i18n('providePasswordMessage'));
            return false;
        }

        // If valid input provided, attempt Sign In with credentials
        Meteor.loginWithPassword(username, password, function(err){
            // Check if error has occurred
            if(err){
                Session.set("usernameHasError", "Incorrect");
                Session.set("passwordHasError", "Incorrect");
                Session.set("errorMessage", i18n('usernamePasswordErrorMessage'));
            } else {
                // Move the user to main page
                Router.go("/");
            }
        });

        // Prevent form reload
        return false;
    },
    "click a.language": function(e, t){
        Session.set("language", $(e.target).data("language"));
        i18n.setLanguage(Session.get("language"));
        moment.locale(Session.get("language"));
    }
});
