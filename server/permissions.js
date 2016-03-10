Roles.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Permissions.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Meteor.users.allow({
    insert: function(userId, doc){
        var adminRole = Roles.Collection.find({name: "Administrator"});
        var adminUser = Meteor.users.find({_id: userId, "profile.roleId": adminRole.roleId});
        return adminUser ? true : false;
    },
    update: function(){
        return true;
    },
    remove: function(userId, doc){
        var adminRole = Roles.Collection.find({name: "Administrator"});
        var adminUser = Meteor.users.find({_id: userId, "profile.roleId": adminRole.roleId});
        return adminUser ? true : false;
    }
});

Questionnaires.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

QuestionTypes.allow({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    }
});

QuestionCategories.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Surveyors.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Answers.allow({
    insert: function(userId, doc){
        var survey = Surveys.findOne({_id: doc.surveyId});
        return userId == survey.userId ? true : false;
    },
    update: function(userId, doc){
        var survey = Surveys.findOne({_id: doc.surveyId});
        return userId == survey.userId ? true : false;
    },
    remove: function(userId, doc){
        var survey = Surveys.findOne({_id: doc.surveyId});
        return userId == survey.userId ? true : false;
    }
});

Questions.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Surveys.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Notifications.allow({
    insert: function(){
        return true;
    },
    update: function(userId, doc){
        return userId == doc.receiverId;
    },
    remove: function(userId, doc){
        return userId == doc.receiverId;
    }
});
