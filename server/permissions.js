roles.allow({
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

permissions.allow({
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
        var adminRole = roles.find({name: "Administrator"});
        var adminUser = Meteor.users.find({_id: userId, "profile.roleId": adminRole.roleId});
        return adminUser ? true : false;
    },
    update: function(){
        return true;
    },
    remove: function(userId, doc){
        var adminRole = roles.find({name: "Administrator"});
        var adminUser = Meteor.users.find({_id: userId, "profile.roleId": adminRole.roleId});
        return adminUser ? true : false;
    }
});

surveys.allow({
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

questionTypes.allow({
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

questionCategories.allow({
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

surveyors.allow({
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

answers.allow({
    insert: function(userId, doc){
        var completedSurvey = completedSurveys.findOne({_id: doc.completedSurveyId});
        return userId == completedSurvey.userId ? true : false;
    },
    update: function(userId, doc){
        var completedSurvey = completedSurveys.findOne({_id: doc.completedSurveyId});
        return userId == completedSurvey.userId ? true : false;
    },
    remove: function(userId, doc){
        var completedSurvey = completedSurveys.findOne({_id: doc.completedSurveyId});
        return userId == completedSurvey.userId ? true : false;
    }
});

questions.allow({
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

completedSurveys.allow({
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