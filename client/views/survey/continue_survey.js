Template.continueSurvey.helpers({
    hasContinueSurvey: function(){
        return completedSurveys.find({userId: Meteor.userId(), status: "started"}).count() > 0;
    },
    continueSurveyList: function(){
        return completedSurveys.find({userId: Meteor.userId(), status: "started"});
    },
    selectedContinueSurvey: function(){
        return Session.equals("selectedCompletedSurveyId", this._id) ? "btn-primary" : "";
    },
    isContinueSurveySelected: function(){
        return Session.get("selectedCompletedSurveyId");
    }
});

Template.continueSurvey.events({
    "click table tr": function(e, t){
        Session.equals("selectedCompletedSurveyId", this._id) ?
            Session.set("selectedCompletedSurveyId", null) : Session.set("selectedCompletedSurveyId", this._id) ;
    },
    "click a#view-completed-survey": function(e, t){
        Router.go('/complete_survey/' + Session.get("selectedCompletedSurveyId"));
    }
});

Template.continueSurvey.onRendered(function(){
    Session.set("selectedCompletedSurveyId", null);
});

Template.continueSurvey.onDestroyed(function(){
    Session.set("selectedCompletedSurveyId", null);
});