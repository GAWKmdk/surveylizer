Template.signUp.helpers({
    "hasErrors": function(){
        return Session.get("errorMessage") ? true : false;
    },
    "errors": function(){
        return Session.get("errorMessage");
    }
});

Template.signUp.events({
    "submit #sign-up-form": function(e, t){
        e.preventDefault();

        // New user document
        var userDoc = {
            username: t.find("#sign-up-username").value,
            password: t.find("#sign-up-password").value,
            profile: {
                firstName: t.find("#sign-up-first-name").value,
                lastName: t.find("#sign-up-last-name").value,
                address: t.find("#sign-up-address").value,
                city: t.find("#sign-up-city").value,
                state: t.find("#sign-up-state").value,
                postalCode: t.find("#sign-up-postal-code").value
            }
        };

        var newUser = new User(userDoc);

        if(newUser.validateAll()) {
            // If valid input provided, create user and login to system
            Accounts.createUser(userDoc, function (err) {
                if (err) {
                    Session.set("errorMessage", err.reason);
                } else {
                    // Redirect to main page on successful user account creation
                    Router.go("/");
                }
            });
        }


        // Prevent form reload
        return false;
    }
});
