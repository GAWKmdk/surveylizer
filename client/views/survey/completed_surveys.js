Template.completedSurveys.onRendered(function () {
    Session.set("selectedSurveyId", null);
});

Template.completedSurveys.onDestroyed(function () {
    Session.set("selectedSurveyId", null);
});

Template.completedSurveys.helpers({
    hasCompletedSurveys: function () {
        return Surveys.find({userId: Meteor.userId(), status: "finished"}).count() > 0;
    },
    completedSurveysList: function () {
        return Surveys.find({userId: Meteor.userId(), status: "finished"}, {sort: {startDate: -1}});
    },
    selectedCompletedSurvey: function () {
        return Session.equals("selectedSurveyId", this._id) ? "active" : "";
    },
    canViewSurvey: function () {
        return Session.get("selectedSurveyId") ? "" : "disabled";
    }
});

Template.completedSurveys.events({
    "click table tr": function (e, t) {
        Session.equals("selectedSurveyId", this._id) ?
            Session.set("selectedSurveyId", null) : Session.set("selectedSurveyId", this._id);
    },
    "click a#view-completed-survey": function (e, t) {
        Router.go('/completed_survey/' + Session.get("selectedSurveyId"));
    }
});