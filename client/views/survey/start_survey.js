newCompletedTool = function(){
    var currentQuestionnaireId = Session.get("questionnaireToStartId");
    var currentUserId = Meteor.userId();

    if(currentQuestionnaireId && currentUserId){
        var currentSurveyId = surveys.insert({
            questionnaireId: currentQuestionnaireId,
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
        Session.set("currentSurveyId", currentSurveyId);
    }
};

Template.startSurvey.onRendered(function(){
    Session.set("questionnaireToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.onDestroyed(function(){
    Session.set("questionnaireToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.helpers({
    "hasQuestionnaires": function(){
        return questionnaires.find().count() > 0;
    },
    "questionnaires": function(){
        return questionnaires.find();
    },
    "numberOfQuestions": function(){
            return questions.find({questionnaireId: this._id}).count();
    },
    "isSelected": function(){
        return Session.get("questionnaireToStartId") ? "btn-primary" : "";
    },
    "canStartSurvey": function(){
        return Session.get("questionnaireToStartId") ? "" : "disabled";
    },
    "surveyStarted": function(){
        return Session.get("surveyStarted");
    }
});

Template.startSurvey.events({
    "click table#surveys-list tr": function(e, t){
        if(Session.equals("questionnaireToStartId", this._id)){
            Session.set("questionnaireToStartId", false);
        } else {
            Session.set("questionnaireToStartId", this._id);
        }
    },
    "click #start-survey": function(e, t){
        newCompletedTool();
        Router.go('/complete_survey/' + Session.get("currentSurveyId"));
    }
});

