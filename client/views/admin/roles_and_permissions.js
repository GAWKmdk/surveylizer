Template.rolesAndPermissions.helpers({
    canEditRole: function () {
        return Session.get("selectedRoleId") ? "" : "disabled";
    },
    canEditPermission: function () {
        return Session.get("selectedPermissionId") ? "" : "disabled";
    }
});

Template.rolesAndPermissions.events({
    'click form .input-group-addon': function (e, t) {
        if (e.target.dataset.formType == "role") {
            $("#new-role-form").trigger("submit");
        } else {
            $("#new-permission-form").trigger("submit");
        }
    },
    'submit #new-role-form': function (e, t) {
        e.preventDefault();

        var roleDoc = {
            name: t.find("#new-role-name").value
        };

        this.role.set(roleDoc);
        var newRole = new Role(roleDoc);

        if (this.role.validate()) {
            newRole.save();
            t.find("form").reset();
            toastr.success("Role successfully created!");
        } else {
            toastr.error(getErrorMessage(this.role.getValidationErrors()));
            ;
        }

        return false;
    },
    'submit #new-permission-form': function (e, t) {
        e.preventDefault();

        var permissionDoc = {
            module: t.find("#new-permission-module").value,
            operation: t.find("#new-permission-operation").value != "empty" ? t.find("#new-permission-operation").value : ""
        };

        this.permission.set(permissionDoc);
        var newPermission = new Permission(permissionDoc);

        if (this.permission.validate()) {
            newPermission.save();
            t.find("form").reset();
            toastr.success("Permission successfully created!");
        } else {
            toastr.error(getErrorMessage(this.permission.getValidationErrors()));
        }

        return false;
    },
    'click #permissions-list tr': function (e, t) {
        Session.equals("selectedPermissionId", this._id) ?
            Session.set("selectedPermissionId", null) : Session.set("selectedPermissionId", this._id);
    },
    'click #roles-list tr': function (e, t) {
        Session.equals("selectedRoleId", this._id) ?
            Session.set("selectedRoleId", null) : Session.set("selectedRoleId", this._id);
    }
});

Template.roles.created = function () {
    this.pagination = new Meteor.Pagination(Roles, {
        sort: {
            name: 1
        }
    });
};

Template.roles.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    roles: function () {
        return Template.instance().pagination.getPage();
    }
});

Template.role.helpers({
    numberOfUsers: function (roleId) {
        return Meteor.users.find({"profile.roleId": roleId}).count();
    },
    selectedRole: function () {
        return Session.equals("selectedRoleId", this._id) ? "active" : "";
    }
});

Template.role.onRendered(function () {
    $.material.init();
});

Template.permissions.created = function () {
    this.pagination = new Meteor.Pagination(Permissions, {
        sort: {
            name: 1
        }
    });
};

Template.permissions.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    permissions: function () {
        return Template.instance().pagination.getPage();
    }
});

Template.permission.helpers({
    selectedPermission: function () {
        return Session.equals("selectedPermissionId", this._id) ? "active" : "";
    }
});

Template.permission.onRendered(function () {
    $.material.init();
});

Template.editRoleModal.helpers({
    selectedRole: function () {
        return Roles.findOne({_id: Session.get("selectedRoleId")});
    },
    availablePermissions: function () {
        return Permissions.find({_id: {$nin: this.permissions}});
    },
    hasPermissions: function () {
        return this.permissions ? true : false;
    },
    rolePermissions: function () {
        return Permissions.find({_id: {$in: this.permissions}});
    }
});

Template.editRoleModal.events({
    "click #add-permission-button": function (e, t) {
        // Get selected permission
        var selectedPermissionId = t.find("#available-permission").value;
        if (selectedPermissionId) {
            var selectedRoleId = Session.get("selectedRoleId");
            if (selectedRoleId) {
                Roles.update({_id: selectedRoleId}, {$push: {permissions: selectedPermissionId}});
            }
        }
    },
    "click .remove-permission": function (e, t) {
        // Get selected role
        var selectedRoleId = Session.get("selectedRoleId");
        if (selectedRoleId) {
            Roles.update({_id: selectedRoleId}, {$pull: {permissions: this._id}});
        }
    },
    "click #edit-role": function (e, t) {
        e.preventDefault();

        var selectedRoleId = Session.get("selectedRoleId");

        if (selectedRoleId) {

            var roleDoc = {
                _id: selectedRoleId,
                name: t.find("#edit-role-name").value
            };

            this.selectedRole.set(roleDoc);

            if (this.selectedRole.validate()) {
                this.selectedRole.save();
                $("#edit-role-modal").modal('hide');
                toastr.success("Role successfully updated!");
            } else {
                toastr.error(getErrorMessage(this.selectedRole.getValidationErrors()));
            }

        }
    }
});

Template.deleteRoleModal.helpers({
    selectedRole: function () {
        return Roles.findOne({_id: Session.get("selectedRoleId")});
    }
});

Template.deleteRoleModal.events({
    "click #delete-role": function (e, t) {
        e.preventDefault();

        var selectedRoleId = Session.get("selectedRoleId");

        if (selectedRoleId) {
            Roles.remove({_id: selectedRoleId}, function (err) {
                if (err) {
                    toastr.error(getErrorMessage(err.reason));
                } else {
                    $("#delete-role-modal").modal('hide');
                    toastr.success("Role successfully deleted!");
                }
            });
        }
    }
});

Template.editPermissionModal.helpers({
    operationEquals: function (operationName) {
        return this.operation == operationName ? "selected" : "";
    },
    selectedPermission: function () {
        return Permissions.findOne({_id: Session.get("selectedPermissionId")});
    }
});

Template.editPermissionModal.events({
    "click #edit-permission": function (e, t) {
        e.preventDefault();

        var selectedPermissionId = Session.get("selectedPermissionId");

        if (selectedPermissionId) {
            var permissionDoc = {
                _id: selectedPermissionId,
                module: t.find("#edit-permission-module").value,
                operation: t.find("#edit-permission-operation").value != "empty" ? t.find("#edit-permission-operation").value : ""
            };

            this.selectedPermission.set(permissionDoc);

            if (this.selectedPermission.validate()) {
                this.selectedPermission.save();
                t.find("form").reset();
                toastr.success("Permission successfully updated!");
            } else {
                toastr.error(getErrorMessage(this.selectedPermission.getValidationErrors()));
            }
        }
    }
});

Template.deletePermissionModal.helpers({
    selectedPermission: function () {
        return Permissions.findOne({_id: Session.get("selectedPermissionId")});
    }
});

Template.deletePermissionModal.events({
    "delete #delete-permission": function (e, t) {
        e.preventDefault();

        var selectedPermissionId = Session.get("selectedPermissionId");

        if (selectedPermissionId) {
            Permissions.remove({_id: selectedPermissionId}, function (err) {
                if (err) {
                    toastr.error(err.reason);
                } else {
                    $("#delete-permission-modal").modal('hide');
                    toastr.success("Permission successfully deleted!");
                }
            });
        }
    }
});
