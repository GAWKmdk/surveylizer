Meteor.startup(function(){

    // Create Permissions Available for the entire system
    if(permissions.find({}).count() == 0){
        for(var i=0; i < modules.length; i++) {
            for (var j = 0; j < operations.length; j++) {
                permissions.insert({
                    module: modules[i],
                    operation: operations[j]
                });
            }
        }
    }

    // Create the Administrator Role if it does not exist
    if(roles.find({name: "Administrator"}).count() == 0){
        // Create the Administrator Role
        var adminRole = {
            name: "Administrator",
            permissions: []
        };
        var permissionIds = permissions.find({}, {_id: 1});
        for(var k=0; k < permissionIds.length; k++){
            adminRole.permissions.push(permissionIds[k]._id);
        }
        roles.insert(adminRole);
    }

    //Create the Super Administrators user if it does not exist
    if(Meteor.users.find({username: "Admin"}).count() == 0){
        // Get the Admin Role
        var adminRoleId = roles.findOne({name: "Administrator"});
        // Create the Administrator User
        Accounts.createUser({
            username: "Admin",
            password: "P@ssw0rd!",
            profile: {
                firstName: "Super",
                lastName: "Admin",
                roleId: adminRoleId,
                address: "N/A",
                city: "N/A",
                state: "N/A",
                postalCode: "N/A"
            }
        });
    }
});


