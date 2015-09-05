Meteor.publish("users", function(){
    return Meteor.users.find();
});

Meteor.publish("roles", function(){
    return roles.find();
});

Meteor.publish("permissions", function(){
    return permissions.find();
});

Meteor.publish("questionnaires", function(){
    return questionnaires.find();
});

Meteor.publish("questionTypes", function(){
    return questionTypes.find();
});

Meteor.publish("questionCategories", function(){
    return questionCategories.find();
});

Meteor.publish("surveyors", function(){
    return surveyors.find();
});

Meteor.publish("surveys", function(){
    return surveys.find();
});

Meteor.publish("questions", function(){
    return questions.find();
});

Meteor.publish("answers", function(){
    return answers.find();
});