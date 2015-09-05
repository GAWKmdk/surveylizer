newCompletedTool = function(){
    var currentSurveyId = Session.get("surveyToStartId");
    var currentUserId = Meteor.userId();

    if(currentSurveyId && currentUserId){
        var currentCompletedSurveyId = completedSurveys.insert({
            surveyId: currentSurveyId,
            userId: currentUserId,
            startDate: new Date(),
            endDate: null,
            status: settings.surveyStatusStarted,
            orderNumber: 1
        }, function(err){
            if(err){
                new Error.throw(err);
            }
        });
        Session.set("currentCompletedSurveyId", currentCompletedSurveyId);
    }
};

Template.startSurvey.onRendered(function(){
    Session.set("surveyToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.onDestroyed(function(){
    Session.set("surveyToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.helpers({
    "hasQuestionnaires": function(){
        return questionnaires.find().count > 0;
    },
    "questionnaires": function(){
        return questionnaires.find();
    },
    "numberOfQuestions": function(){
        return questions.find({surveyId: this._id}).count();
    },
    "isSelected": function(){
        return Session.get("surveyToStartId") ? "btn-primary" : "";
    },
    "canStartSurvey": function(){
        return Session.get("surveyToStartId") ? "" : "disabled";
    },
    "surveyStarted": function(){
        return Session.get("surveyStarted");
    }
});

Template.startSurvey.events({
    "click table#surveys-list tr": function(e, t){
        if(Session.equals("surveyToStartId", this._id)){
            Session.set("surveyToStartId", false);
        } else {
            Session.set("surveyToStartId", this._id);
        }
    },
    "click #start-survey": function(e, t){
        newCompletedTool();
        Router.go('/complete_survey/' + Session.get("currentCompletedSurveyId"));
    }
});

