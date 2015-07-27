Template.completedSurveys.helpers({
    hasCompletedSurveys: function(){
        return completedSurveys.find({userId: Meteor.userId(), status: "finished"}).count() > 0;
    },
    completedSurveysList: function(){
        return completedSurveys.find({userId: Meteor.userId(),status: "finished"}, {sort: {startDate: -1}});
    },
    selectedCompletedSurvey: function(){
        return Session.equals("selectedCompletedSurveyId", this._id) ? "btn-primary" : "";
    },
    isCompletedSurveySelected: function(){
        return Session.get("selectedCompletedSurveyId");
    }
});

Template.completedSurveys.events({
    "click table tr": function(e, t){
        Session.equals("selectedCompletedSurveyId", this._id) ?
            Session.set("selectedCompletedSurveyId", null) : Session.set("selectedCompletedSurveyId", this._id) ;
    },
    "click a#view-completed-survey": function(e, t){
        Router.go('/completed_survey/' + Session.get("selectedCompletedSurveyId"));
    }
});