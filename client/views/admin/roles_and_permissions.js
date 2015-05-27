Template.rolesAndPermissions.helpers({
    roles: function(){
        return roles.find();
    },
    permissions: function(){
        return permissions.find();
    },
    numberOfUsers: function(roleId){
        return  Meteor.users.find({"profile.roleId": roleId}).count();
    }
});

Template.rolesAndPermissions.events({
    'click form .input-group-addon': function(e, t){
        //if(e.target.attributes.getNamedItem("form-type") == "role"){
        //    $("#new-role-form").trigger("submit");
        //} else {
        //    $("#new-permission-form").trigger("submit");
        //}
        console.log(e.target.attributes.getNamedItem("form-type"));
    },
    'keyup #new-role-name': function(e, t){
        if(e.which === 13){
            $("#new-role-form").trigger("submit");
        }
    },
    'submit #new-role-form': function(e, t){
        var newRoleName = t.find("#new-role-name").value;
        check(newRoleName, String);

        if(newRoleName){
            roles.insert({
                name: newRoleName
            });
            t.find("#new-role-name").value = "";
        }
    }
});