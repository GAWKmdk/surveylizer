Template.completedSurveys.onRendered(function(){
    Session.set("selectedSurveyId", null);
});

Template.completedSurveys.onDestroyed(function(){
    Session.set("selectedSurveyId", null);
});

Template.completedSurveys.helpers({
    hasCompletedSurveys: function(){
        return surveys.find({userId: Meteor.userId(), status: "finished"}).count() > 0;
    },
    completedSurveysList: function(){
        return surveys.find({userId: Meteor.userId(),status: "finished"}, {sort: {startDate: -1}});
    },
    selectedCompletedSurvey: function(){
        return Session.equals("selectedSurveyId", this._id) ? "btn-primary" : "";
    },
    isCompletedSurveySelected: function(){
        return Session.get("selectedSurveyId");
    }
});

Template.completedSurveys.events({
    "click table tr": function(e, t){
        Session.equals("selectedSurveyId", this._id) ?
            Session.set("selectedSurveyId", null) : Session.set("selectedSurveyId", this._id) ;
    },
    "click a#view-completed-survey": function(e, t){
        Router.go('/completed_survey/' + Session.get("selectedSurveyId"));
    }
});