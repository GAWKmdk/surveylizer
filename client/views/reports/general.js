Template.generalReport.onCreated(function () {
    this.pQuestionnnaires = new Meteor.Pagination(Questionnaires);
    this.pQuestions= new Meteor.Pagination(Questions);
    this.pSurveys = new Meteor.Pagination(Surveys);
    this.pSurveyors = new Meteor.Pagination(Surveyors);
    this.pAnswers = new Meteor.Pagination(Answers);
});

Template.generalReport.helpers({
    totalQuestionnaires: function(){
        Template.instance().pQuestionnnaires.getPage();
        return Template.instance().pQuestionnnaires.totalItems();
    },
    totalQuestions: function(){
        Template.instance().pQuestions.getPage();
        return Template.instance().pQuestions.totalItems();
    },
    totalSurveys: function(){
        Template.instance().pSurveys.getPage();
        return Template.instance().pSurveys.totalItems();
    },
    totalSurveyors: function(){
        Template.instance().pSurveyors.getPage();
        return Template.instance().pSurveyors.totalItems();
    },
    totalRespondents: function(){

    },
    totalAnswers: function(){
        Template.instance().pAnswers.getPage();
        return Template.instance().pAnswers.totalItems();
    }
});