Meteor.publish("users", function(){
    return Meteor.users.find();
});

Meteor.publish("roles", function(){
    return roles.find();
});

Meteor.publish("permissions", function(){
    return permissions.find();
});