Meteor.publish("users", function(){
    return Meteor.users.find();
});

Meteor.publish("roles", function(){
    return roles.find();
});

Meteor.publish("permissions", function(){
    return permissions.find();
});

Meteor.publish("surveys", function(){
    return surveys.find();
});

Meteor.publish("questionTypes", function(){
    return questionTypes.find();
});

Meteor.publish("questionCategories", function(){
    return questionCategories.find();
});