Template.users.created = function () {
    this.pagination = new Meteor.Pagination(Meteor.users, {
        sort: {
            username: 1
        }
    });
};

Template.users.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    users: function () {
        if (Session.get("searchAttr") && Session.get("searchValue")) {
            var selectedField = Session.equals("searchAttr", "username") ?
                Session.get("searchAttr") : "profile." + Session.get("searchAttr");
            var searchFilter = {};
            var searchObject = {
                $regex: Session.get("searchValue"), $options: 'i'
            };

            searchFilter[selectedField] = searchObject;
            Template.instance().pagination.filters(searchFilter);
        } else {
            Template.instance().pagination.filters({});
        }
        return Template.instance().pagination.getPage();
    },
    canEditUser: function () {
        return Session.get("selectedUserId") ? "" : "disabled";
    }
});

Template.users.events({
    "click table tr": function (e, t) {
        Session.equals("selectedUserId", this._id) ?
            Session.set("selectedUserId", null) : Session.set("selectedUserId", this._id);
    },
    "click table thead td": function (e, t) {
        var index = $(event.target).index() + 1;

        t.$("table thead td.active").removeClass("active");
        t.$("table thead td:nth-child(" + index + ")").addClass("active");

        Session.set("searchAttr", $(event.target).data("search-name"));
    },
    "keyup input#search-users": function (e, t) {
        $("#search-users-form").trigger("submit");
    },
    "submit #search-users-form": function(e, t){
        e.preventDefault();

        var searchTerm = t.find("#search-users").value;
        if(searchTerm){
            Session.set("searchValue", searchTerm);
        } else {
            Session.set("searchValue", null);
        }

        return false;
    },
    "change #user-search-field": function(e, t){
        var selectedOption = t.$(e.target).val();
        Session.set("searchAttr", selectedOption);
    }
});

Template.users.onRendered(function () {
    Session.set("searchAttr", $("table thead td.active").data("search-name"));
});

Template.user.helpers({
    selectedUser: function () {
        return Session.equals("selectedUserId", this._id) ? "active" : "";
    },
    userRole: function () {
        return this.role().name;
    }
});

Template.user.events({});

Template.newUserModal.onRendered(function () {
    $.material.init();
});

Template.newUserModal.helpers({
    "userRoles": function () {
        return Roles.find();
    },
    "hasErrors": function () {
        return Session.get("errorMessage") ? true : false;
    },
    "errors": function () {
        return Session.get("errorMessage");
    }
});

Template.newUserModal.events({
    "submit #new-user-modal form": function (e, t) {
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

        if (this.user.validate()) {
            Meteor.call('addNewUser', userDoc, function (err) {
                if (err) {
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#new-user-modal").modal('hide');
                    // Send notification to Admin(s)
                    Notify.admin(i18n('notificationNewUserTitle'), i18n('notificationNewUserDetail'));
                    toastr.success(i18n("toastr.userCreated"));
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.editUserModal.helpers({
    "userRoles": function () {
        return Roles.find();
    },
    "selectedRole": function (roleId) {
        return Template.parentData(1).profile.roleId == roleId ? "selected" : "";
    },
    "hasErrors": function () {
        return Session.get("errorMessage") ? true : false;
    },
    "errors": function () {
        return Session.get("errorMessage");
    },
    "selectedUser": function () {
        this.selectedUser = Meteor.users.findOne({_id: Session.get("selectedUserId")});
        return this.selectedUser;
    }
});

Template.editUserModal.events({
    "submit #edit-user-modal form": function (e, t) {
        e.preventDefault();

        var selectedUserId = Session.get("selectedUserId");

        if (selectedUserId) {

            var userDoc = {
                profile: {
                    roleId: t.find("#edit-user-role").value != "empty" ? t.find("#edit-user-role").value : "",
                    firstName: t.find("#edit-user-first-name").value,
                    lastName: t.find("#edit-user-last-name").value,
                    address: t.find("#edit-user-address").value,
                    city: t.find("#edit-user-city").value,
                    state: t.find("#edit-user-state").value,
                    postalCode: t.find("#edit-user-postal-code").value
                }
            };

            this.selectedUser = Meteor.users.findOne({_id: selectedUserId});
            this.selectedUser.set(userDoc);

            // @hack: Temporarily add password field so that the validation will pass
            this.selectedUser.set({password: "P@ssw0rd!"});

            if (this.selectedUser.validate()) {
                // remove the password field relate to above @hack
                delete this.selectedUser.password;

                // Update the selected user
                Meteor.call("updateUser", this.selectedUser, function(err){
                    if (err) {
                        toastr.error(err.reason);
                    } else {
                        $("#edit-user-modal").modal('hide');
                        toastr.success(i18n("toastr.userUpdated"));
                    }
                });
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteUserModal.helpers({
    "selectedUser": function () {
        return Meteor.users.findOne({_id: Session.get("selectedUserId")});
    },
    "fullName": function () {
        return this.profile.firstName + " " + this.profile.lastName;
    }
});

Template.deleteUserModal.events({
    "submit #delete-user-modal form": function (e, t) {
        e.preventDefault();

        var selectedUserId = Session.get("selectedUserId");

        if (selectedUserId) {
            this.selectedUser = Meteor.users.findOne({_id: selectedUserId});

            Meteor.call("deleteUser", this.selectedUser, function (err) {
                if (err) {
                    toastr.error(err.reason);
                } else {
                    Session.set("selectedUserId", null);
                    $("#delete-user-modal").modal('hide');
                    toastr.success(i18n("toastr.userDeleted"));
                }
            });
        }

        // Prevent form reload
        return false;
    }
});
