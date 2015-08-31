Template.signUp.helpers({
    "usernameHasError": function(){
        return Session.get("usernameHasError") ? "has-error" : "";
    },
    "passwordHasError": function(){
        return Session.get("passwordHasError") ? "has-error" : "";
    },
    "firstNameHasError": function(){
        return Session.get("firstNameHasError") ? "has-error" : "";
    },
    "lastNameHasError": function(){
        return Session.get("lastNameHasError") ? "has-error" : "";
    },
    "addressHasError": function(){
        return Session.get("addressHasError") ? "has-error" : "";
    },
    "cityHasError": function(){
        return Session.get("cityHasError") ? "has-error" : "";
    },
    "stateHasError": function(){
        return Session.get("stateHasError") ? "has-error" : "";
    },
    "postalCodeHasError": function(){
        return Session.get("postalCodeHasError") ? "has-error" : "";
    },
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

        // Get username and password values
        var username = t.find("#sign-up-username").value,
            password = t.find("#sign-up-password").value,
            firstName = t.find("#sign-up-first-name").value,
            lastName = t.find("#sign-up-last-name").value,
            address = t.find("#sign-up-address").value,
            city = t.find("#sign-up-city").value,
            state = t.find("#sign-up-state").value,
            postalCode = t.find("#sign-up-postal-code").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("usernameHasError", null);
        Session.set("passwordHasError", null);
        Session.set("firstNameHasError", null);
        Session.set("lastNameHasError", null);
        Session.set("addressHasError", null);
        Session.set("cityHasError", null);
        Session.set("stateHasError", null);
        Session.set("postalCodeHasError", null);

        // Trim fields
        username = trimInput(username);
        password = trimInput(password);
        firstName = trimInput(firstName);
        lastName = trimInput(lastName);
        address = trimInput(address);
        city = trimInput(city);
        state = trimInput(state);
        postalCode = trimInput(postalCode);

        // Errors Array
        var errors = [];

        // Validate username field
        try{
            check(username, nonEmptyString);
        } catch(e) {
            Session.set("usernameHasError", true);
            errors.push("A proper <em>Username</em> is required.");
        }

        // Validate first name field
        try{
            check(firstName, nonEmptyString);
        } catch(e) {
            Session.set("firstNameHasError", true);
            errors.push("Your <em>First Name</em> is required.");
        }

        // Validate last name field
        try{
            check(lastName, nonEmptyString);
        } catch(e) {
            Session.set("lastNameHasError", true);
            errors.push("Your <em>Last Name</em> is required.");
        }

        //// Validate address field
        //try{
        //    check(address, nonEmptyString);
        //} catch(e) {
        //    Session.set("addressHasError", true);
        //    errors.push("Your <em>Address</em> is required.");
        //}
        //
        //// Validate city field
        //try{
        //    check(city, nonEmptyString);
        //} catch(e) {
        //    Session.set("cityHasError", true);
        //    errors.push("Your <em>City</em> is required.");
        //}
        //
        //// Validate state field
        //try{
        //    check(state, nonEmptyString);
        //} catch(e) {
        //    Session.set("stateHasError", true);
        //    errors.push("Your <em>State</em> is required.");
        //}
        //
        //// Validate postal code field
        //try{
        //    check(postalCode, nonEmptyString);
        //} catch(e) {
        //    Session.set("postalCodeHasError", true);
        //    errors.push("Your <em>postal Code</em> is required.");
        //}

        // Check if the password field contains at least one lowercase alphabet
        try{
            check(password, passwordLowercase);
        } catch(e) {
            Session.set("passwordHasError", true);
            errors.push("Password needs to include at least <em>1 Lowercase</em> Alphabet.");
        }

        // Check if the password field contains at least one uppercase alphabet
        try{
            check(password, passwordUppercase);
        } catch(e) {
            Session.set("passwordHasError", true);
            errors.push("Password needs to include at least <em>1 Uppercase</em> Alphabet.");
        }

        // Check if the password field contains at least one number
        try{
            check(password, passwordNumber);
        } catch(e) {
            Session.set("passwordHasError", true);
            errors.push("Password needs to include at least <em>1 Number.</em>");
        }

        // Check if the password field contains at least one special alphabet
        try{
            check(password, passwordSpecialCharacter);
        } catch(e) {
            Session.set("passwordHasError", true);
            errors.push("Password needs to include at least <em>1 Special Character.</em>");
        }

        // Check if the password is at least 8 characters long
        try{
            check(password, passwordMinLength);
        } catch(e) {
            Session.set("passwordHasError", true);
            errors.push("Password needs to be a minimum of <em>8 characters.</em>");
        }

        // Check if the password is at most 14 characters long
        try{
            check(password, passwordMaxLength);
        } catch(e) {
            Session.set("passwordHasError", true);
            errors.push("Password needs to be a maximum of <em>14 characters</em>");
        }

        // Check if there are any errors
        if(errors.length){
            var error_messages = "";
            _.each(errors, function(error){
                error_messages += "<li>"+error+"</li>";
            });
            Session.set("errorMessage", "Please correct the following errors:" +
                "<ul>" +
                error_messages +
                "</ul>");
            return false;
        }

        // New user document
        var userDoc = {
            username: username,
            password: password,
            profile: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                state: state,
                postalCode: postalCode
            }
        };

        // If valid input provided, create user and login to system
        Accounts.createUser(userDoc, function(err){
          if (err) {
            // Handle any errors, also checks for uniqueness of username address
            Session.set("errorMessage", err.reason);
          } else {
            // Redirect to main page on successful user account creation
            Router.go("/");
          }
        });

        // Prevent form reload
        return false;
    }
});
