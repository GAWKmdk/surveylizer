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
        var adminRole = {
            name: "Administrator",
            permissions: []
        };

        // Add all permission available
        var permissionIds = permissions.find({}, {_id: 1}).fetch();
        for(var k=0; k < permissionIds.length; k++){
            adminRole.permissions.push(permissionIds[k]._id);
        }
        roles.insert(adminRole);
    }

    // Create the Surveyor Role if it does not exist
    if(roles.find({name: "Surveyor"}).count() == 0){
        var surveyorRole = {
            name: "Surveyor",
            permissions: []
        };
        roles.insert(surveyorRole);
    }

    //Create the Super Administrators user if it does not exist
    if(Meteor.users.find({username: "Admin"}).count() == 0){
        // Get the Admin Role
        var adminRole = roles.findOne({name: "Administrator"});
        // Create the Administrator User
        Accounts.createUser({
            username: "Admin",
            password: "P@ssw0rd!",
            profile: {
                firstName: "Super",
                lastName: "Admin",
                roleId: adminRole._id,
                address: "N/A",
                city: "N/A",
                state: "N/A",
                postalCode: "N/A"
            }
        });
    }
});


