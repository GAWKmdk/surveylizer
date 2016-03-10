Template.continueSurvey.helpers({
    hasContinueSurvey: function(){
        return Surveys.find({userId: Meteor.userId(), status: "started"}).count() > 0;
    },
    continueSurveyList: function(){
        return Surveys.find({userId: Meteor.userId(), status: "started"});
    },
    selectedContinueSurvey: function(){
        return Session.equals("selectedSurveyId", this._id) ? "active" : "";
    },
    canContinueSurvey: function(){
        return Session.get("selectedSurveyId") ? "" : "disabled";
    }
});

Template.continueSurvey.events({
    "click table tr": function(e, t){
        Session.equals("selectedSurveyId", this._id) ?
            Session.set("selectedSurveyId", null) : Session.set("selectedSurveyId", this._id) ;
    },
    "click a#continue-completed-survey": function(e, t){
        Router.go('/complete_survey/' + Session.get("selectedSurveyId"));
    }
});

Template.continueSurvey.onRendered(function(){
    Session.set("selectedSurveyId", null);
});

Template.continueSurvey.onDestroyed(function(){
    Session.set("selectedSurveyId", null);
});

Template.viewSurveyModal.helpers({
    selectedSurvey: function(){
        return Surveys.findOne({_id: Session.get("selectedSurveyId")});
    },
    isTypeOpenEnded: function(){
        return Template.parentData(1).isTypeOpenEnded();
    }
});
