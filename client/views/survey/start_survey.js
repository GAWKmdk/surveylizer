Template.startSurvey.onRendered(function(){
    Session.set("surveyToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.onDestroyed(function(){
    Session.set("surveyToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.helpers({
    "surveys": function(){

        return surveys.find();
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
        Session.set("surveyStarted", true);
        Session.set("questionOrderNumber", 1);
    }
});

Template.question.helpers({
    "currentQuestion": function(){
        return questions.findOne({surveyId: Session.get("surveyToStartId"), orderNumber: Session.get("questionOrderNumber")});
    },
    "isTypeOpenEnded": function(){
        var currentQuestionType = questionTypes.findOne({_id: this.typeId});
        return currentQuestionType.name == "Open Ended";
    },
    "isSingleChoice": function(){
        return this.choiceType == "Single";
    },
    "canNavigateBackward": function(){
        var currentQuestionOrderNumber = Session.get("questionOrderNumber");
        return currentQuestionOrderNumber > 1 ?  true : false;
    },
    "canNavigateForward": function(){
        var currentSurveyQuestionsCount = questions.find({surveyId: Session.get("surveyToStartId")}).count();
        var currentQuestionOrderNumber = Session.get("questionOrderNumber");
        return currentQuestionOrderNumber < currentSurveyQuestionsCount ?  true : false;
    },
    "lastQuestion": function(){
        var currentSurveyQuestionsCount = questions.find({surveyId: Session.get("surveyToStartId")}).count();
        var currentQuestionOrderNumber = Session.get("questionOrderNumber");
        return currentQuestionOrderNumber == currentSurveyQuestionsCount ?  true : false;
    }
});

Template.question.events({
    "click #next-question": function(e, t){
        var currentQuestionOrderNumber = Session.get("questionOrderNumber");
        Session.set("questionOrderNumber", currentQuestionOrderNumber + 1);
    },
    "click #previous-question": function(e, t){
        var currentQuestionOrderNumber = Session.get("questionOrderNumber");
        Session.set("questionOrderNumber", currentQuestionOrderNumber - 1);
    }
});

Template.radioInput.onRendered(function(){
    $.material.radio();
});

Template.radioInput.helpers({
    "name": function(){
        return Template.parentData(0).name;
    }
});

Template.checkboxInput.onRendered(function(){
    $.material.checkbox();
});

Template.checkboxInput.helpers({
    "name": function(){
        return Template.parentData(0).name;
    },
    "orderNumber": function(){
        return Template.parentData(0).orderNumber;
    }
});