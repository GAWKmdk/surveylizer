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

questionnaires.allow({
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
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
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
        var survey = surveys.findOne({_id: doc.surveyId});
        return userId == survey.userId ? true : false;
    },
    update: function(userId, doc){
        var survey = surveys.findOne({_id: doc.surveyId});
        return userId == survey.userId ? true : false;
    },
    remove: function(userId, doc){
        var survey = surveys.findOne({_id: doc.surveyId});
        return userId == survey.userId ? true : false;
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

notifications.allow({
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