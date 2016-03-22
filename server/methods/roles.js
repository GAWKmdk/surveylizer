Meteor.methods({
    "addRolePermission": function(roleId, permissionId){
        Roles.update({_id: roleId}, {$push: {permissions: permissionId}});
    },
    "removeRolePermission": function(roleId, permissionId){
        Roles.update({_id: roleId}, {$pull: {permissions: permissionId}});
    },
    "updateRole": function(roleObj){
        roleObj.save();
    },
    "deleteRole": function(roleObj){
        roleObj.remove();
    }
});