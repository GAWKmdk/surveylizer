function newEntry(entry, entryType){
    check(entry, nonEmptyString);

    if(entryType){
        if(entryType == "role"){
            roles.insert({
                name: entry,
                permissions: []
            });
        } else if(entryType == "permission"){
            permissions.insert({
                name: entry
            });
        }

        $("#new-"+ entryType + "-name").val("");
    }
}

Template.rolesAndPermissions.helpers({
    roles: function(){
        return roles.find();
    },
    permissions: function(){
        return permissions.find();
    },
    numberOfUsers: function(roleId){
        return  Meteor.users.find({"profile.roleId": roleId}).count();
    },
    selectedRole: function(){
        return Session.equals("selectedRoleId", this._id) ? "btn-primary" : "";
    },
    selectedPermission: function(){
        return Session.equals("selectedPermissionId", this._id) ? "btn-primary" : "";
    },
    isRoleSelected: function(){
        return Session.get("selectedRoleId") ? true : false;
    },
    isPermissionSelected: function(){
        return Session.get("selectedPermissionId") ? true : false;
    }
});

Template.rolesAndPermissions.events({
    'click form .input-group-addon': function(e, t){
        if(e.target.dataset.formType == "role"){
            $("#new-role-form").trigger("submit");
        } else {
            $("#new-permission-form").trigger("submit");
        }
    },
    'keyup form input': function(e, t){
        if(e.which === 13){
            if(e.target.dataset.formType == "role"){
                $("#new-role-form").trigger("submit");
            } else {
                $("#new-permission-form").trigger("submit");
            }
        }
    },
    'submit #new-role-form': function(e, t){
        e.preventDefault();
        var newRoleName = t.find("#new-role-name").value;
        newEntry(newRoleName, "role");
        return false;
    },
    'submit #new-permission-form': function(e, t){
        e.preventDefault();
        var newPermissionName = t.find("#new-permission-name").value;
        newEntry(newPermissionName, "permission");
        return false;
    },
    'click #permissions-list tr': function(e, t){
        Session.equals("selectedPermissionId", this._id) ?
            Session.set("selectedPermissionId", null) : Session.set("selectedPermissionId", this._id);
    },
    'click #roles-list tr': function(e, t){
        Session.equals("selectedRoleId", this._id) ?
            Session.set("selectedRoleId", null) : Session.set("selectedRoleId", this._id);
    }
});

Template.editRoleModal.helpers({
    "selectedRole": function(){
        return roles.findOne({_id:Session.get("selectedRoleId")});
    },
    availablePermissions: function(){
        return permissions.find({_id: {$nin: this.permissions}});
    },
    hasPermissions: function(){
        return this.permissions ? true : false;
    },
    rolePermissions: function(){
        return permissions.find({_id: {$in: this.permissions}});
    }
});

Template.editRoleModal.events({
    "click #add-permission-button": function(e, t){
        // Get selected permission
        var selectedPermissionId = t.find("#available-permission").value;
        if(selectedPermissionId){
            var selectedRoleId = Session.get("selectedRoleId");
            if(selectedRoleId){
                roles.update({_id: selectedRoleId}, {$push: {permissions: selectedPermissionId}});
            }
        }
    },
    "click .remove-permission": function(e, t){
        // Get selected role
        var selectedRoleId = Session.get("selectedRoleId");
        if(selectedRoleId){
            roles.update({_id: selectedRoleId}, {$pull: {permissions: this._id}});
        }
    },
    "submit #edit-role-modal form": function(e, t){
        e.preventDefault();

        // Get permission name
        var name = t.find("#edit-role-name").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("nameHasError", null);

        // Trim field
        name = trimInput(name);

        // Errors Array
        var errors = [];

        // Validate name field
        try{
            check(name, nonEmptyString);
        } catch(e) {
            errors.push("<em>Name</em> is required.");
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
        var doc = {
            "name": name
        };

        var selectedRoleId = Session.get("selectedPermissionId");

        if(selectedRoleId){
            // Update the selected user
            permissions.update({_id: selectedRoleId}, {$set: doc}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#edit-role-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteRoleModal.helpers({
    selectedRole: function(){
        return roles.findOne({_id: Session.get("selectedRoleId")});
    }
});

Template.deleteRoleModal.events({
    "submit #delete-role-modal form": function(e, t){
        e.preventDefault();

        var selectedRoleId = Session.get("selectedRoleId");

        if(selectedRoleId){
            roles.remove({_id: selectedRoleId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#delete-role-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.editPermissionModal.helpers({
    selectedPermission: function(){
        return permissions.findOne({_id: Session.get("selectedPermissionId")});
    }
});

Template.editPermissionModal.events({
    "submit #edit-permission-modal form": function(e, t){
        e.preventDefault();

        // Get permission name
        var name = t.find("#edit-permission-name").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("nameHasError", null);

        // Trim field
        name = trimInput(name);

        // Errors Array
        var errors = [];

        // Validate name field
        try{
            check(name, nonEmptyString);
        } catch(e) {
            errors.push("<em>Name</em> is required.");
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
        var doc = {
            "name": name
        };

        var selectedPermissionId =Session.get("selectedPermissionId");

        if(selectedPermissionId){
            // Update the selected user
            permissions.update({_id: selectedPermissionId}, {$set: doc}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#edit-permission-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.deletePermissionModal.helpers({
    selectedPermission: function(){
        return permissions.findOne({_id: Session.get("selectedPermissionId")});
    }
});

Template.deletePermissionModal.events({
    "submit #delete-permission-modal form": function(e, t){
        e.preventDefault();

        var selectedPermissionId =Session.get("selectedPermissionId");

        if(selectedPermissionId){
            permissions.remove({_id: selectedPermissionId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#delete-permission-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});