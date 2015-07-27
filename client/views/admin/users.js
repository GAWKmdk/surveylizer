Template.users.helpers({
    systemUsers: function(){
        return Meteor.users.find({});
    },
    userRole: function(){
        return roles.findOne({_id: this.profile.roleId});
    },
    selectedUser: function(){
        return Session.equals("selectedUserId", this._id) ? "btn-primary" : "";
    },
    isUserSelected: function(){
        return Session.get("selectedUserId");
    }
});

Template.users.events({
   "click table tr": function(e, t){
       Session.equals("selectedUserId", this._id) ?
           Session.set("selectedUserId", null) : Session.set("selectedUserId", this._id) ;
   }
});

Template.newUserModal.helpers({
    "userRoles": function(){
        return roles.find();
    },
    "emailHasError": function(){
        return Session.get("emailHasError") ? "has-error" : "";
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
    "zipCodeHasError": function(){
        return Session.get("zipCodeHasError") ? "has-error" : "";
    },
    "hasErrors": function(){
        return Session.get("errorMessage") ? true : false;
    },
    "errors": function(){
        return Session.get("errorMessage");
    }
});

Template.newUserModal.events({
    "submit #new-user-modal form": function(e, t){
        e.preventDefault();

        // Get email and password values
        var email = t.find("#new-user-email").value,
            password = t.find("#new-user-password").value,
            roleId = t.find("#new-user-role").value,
            firstName = t.find("#new-user-first-name").value,
            lastName = t.find("#new-user-last-name").value,
            address = t.find("#new-user-address").value,
            city = t.find("#new-user-city").value,
            state = t.find("#new-user-state").value,
            postalCode = t.find("#new-user-postal-code").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("emailHasError", null);
        Session.set("passwordHasError", null);
        Session.set("roleHasError", null);
        Session.set("firstNameHasError", null);
        Session.set("lastNameHasError", null);
        Session.set("addressHasError", null);
        Session.set("cityHasError", null);
        Session.set("stateHasError", null);
        Session.set("postalCodeHasError", null);

        // Trim fields
        email = trimInput(email);
        password = trimInput(password);
        roleId = trimInput(roleId);
        firstName = trimInput(firstName);
        lastName = trimInput(lastName);
        address = trimInput(address);
        city = trimInput(city);
        state = trimInput(state);
        postalCode = trimInput(postalCode);

        // Errors Array
        var errors = [];

        // Validate email field
        try{
            check(email, checkEmail);
        } catch(e) {
            Session.set("emailHasError", true);
            errors.push("A proper <em>Email</em> is required.");
        }

        // Validate role field
        try{
            check(roleId, nonEmptyString);
        } catch(e) {
            Session.set("roleHasError", true);
            errors.push("<em>Role</em> is required.");
        }

        // Validate first name field
        try{
            check(firstName, nonEmptyString);
        } catch(e) {
            Session.set("firstNameHasError", true);
            errors.push("<em>First Name</em> is required.");
        }

        // Validate last name field
        try{
            check(lastName, nonEmptyString);
        } catch(e) {
            Session.set("lastNameHasError", true);
            errors.push("<em>Last Name</em> is required.");
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
            email: email,
            password: password,
            roleId: roleId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            postalCode: postalCode
        };

        // If valid input provided, create user and login to system
        Accounts.createUser(userDoc, function(err){
            if (err) {
                // Handle any errors, also checks for uniqueness of email address
                Session.set("errorMessage", err.reason);
            } else {
                $("#new-user-modal").modal('hide');
            }
        });

        // Prevent form reload
        return false;
    }
});

Template.editUserModal.helpers({
    "userRoles": function(){
        return roles.find();
    },
    "selectedRole": function(roleId){
        return Template.parentData(1).profile.roleId == roleId ? "selected" : "";
    },
    "emailHasError": function(){
        return Session.get("emailHasError") ? "has-error" : "";
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
    "zipCodeHasError": function(){
        return Session.get("zipCodeHasError") ? "has-error" : "";
    },
    "hasErrors": function(){
        return Session.get("errorMessage") ? true : false;
    },
    "errors": function(){
        return Session.get("errorMessage");
    },
    "selectedUser": function(){
        return Meteor.users.findOne({_id: Session.get("selectedUserId")});
    }
});

Template.editUserModal.events({
    "submit #edit-user-modal form": function(e, t){
        e.preventDefault();

        // Get profile values
        var roleId = t.find("#edit-user-role").value,
            firstName = t.find("#edit-user-first-name").value,
            lastName = t.find("#edit-user-last-name").value,
            address = t.find("#edit-user-address").value,
            city = t.find("#edit-user-city").value,
            state = t.find("#edit-user-state").value,
            postalCode = t.find("#edit-user-postal-code").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("roleHasError", null);
        Session.set("firstNameHasError", null);
        Session.set("lastNameHasError", null);
        Session.set("addressHasError", null);
        Session.set("cityHasError", null);
        Session.set("stateHasError", null);
        Session.set("postalCodeHasError", null);

        // Trim fields
        roleId = trimInput(roleId);
        firstName = trimInput(firstName);
        lastName = trimInput(lastName);
        address = trimInput(address);
        city = trimInput(city);
        state = trimInput(state);
        postalCode = trimInput(postalCode);

        // Errors Array
        var errors = [];

        // Validate role field
        try{
            check(roleId, nonEmptyString);
        } catch(e) {
            Session.set("roleHasError", true);
            errors.push("<em>Role</em> is required.");
        }

        // Validate first name field
        try{
            check(firstName, nonEmptyString);
        } catch(e) {
            Session.set("firstNameHasError", true);
            errors.push("<em>First Name</em> is required.");
        }

        // Validate last name field
        try{
            check(lastName, nonEmptyString);
        } catch(e) {
            Session.set("lastNameHasError", true);
            errors.push("<em>Last Name</em> is required.");
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
            "profile.roleId": roleId,
            "profile.firstName": firstName,
            "profile.lastName": lastName,
            "profile.address": address,
            "profile.city": city,
            "profile.state": state,
            "profile.postalCode": postalCode
        };

        var selectedUserId = Session.get("selectedUserId");

        if(selectedUserId){
            // Update the selected user
            Meteor.users.update({_id: selectedUserId}, {$set: userDoc}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#edit-user-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteUserModal.helpers({
    "selectedUser": function(){
        return Meteor.users.findOne({_id: Session.get("selectedUserId")});
    },
    "fullName": function(){
        return this.profile.firstName + " " + this.profile.lastName;
    }
});

Template.deleteUserModal.events({
    "submit #delete-user-modal form": function(e, t){
        e.preventDefault();

        var selectedUserId = Session.get("selectedUserId");

        if(selectedUserId){
            // Remove selected user from the collection
            Meteor.users.remove({_id: selectedUserId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#delete-user-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});