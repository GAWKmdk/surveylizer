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

        // New user document
        var userDoc = {
            username: t.find("#new-user-username").value,
            password: t.find("#new-user-password").value,
            profile: {
                roleId: t.find("#new-user-role").value != "empty" ? t.find("#new-user-role").value : "",
                firstName: t.find("#new-user-first-name").value,
                lastName: t.find("#new-user-last-name").value,
                address: t.find("#new-user-address").value,
                city: t.find("#new-user-city").value,
                state: t.find("#new-user-state").value,
                postalCode: t.find("#new-user-postal-code").value
            }
        };

        this.user.set(userDoc);

        if(this.user.validateAll()){
            Meteor.call('addNewUser', userDoc, function(err){
                if(err){
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#new-user-modal").modal('hide');
                    toastr.success("User successfully created!");
                }
            });
        }

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
                    Session.set("selectedUserId", null);
                    toastr.success("User successfully deleted!");
                }
            });
        }

        // Prevent form reload
        return false;
    }
});