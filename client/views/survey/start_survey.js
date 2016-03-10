Template.startSurvey.onRendered(function(){
    Session.set("questionnaireToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.onDestroyed(function(){
    Session.set("questionnaireToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.helpers({
    hasQuestionnaires: function(){
        return Questionnaires.find().count() > 0;
    },
    questionnaires: function(){
        return Questionnaires.find();
    },
    numberOfQuestions: function(){
            return Questions.find({questionnaireId: this._id}).count();
    },
    isSelected: function(){
        return Session.get("questionnaireToStartId") == this._id ? "active" : "";
    },
    canStartSurvey: function(){
        return Session.get("questionnaireToStartId") ? "" : "disabled";
    },
    surveyStarted: function(){
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
    }
});

Template.startSurveyModal.helpers({
    geoLocation: function(){
        return Geolocation.latLng();
    }
});

Template.startSurveyModal.events({
   "submit form": function(e, t){
       e.preventDefault();

       var currentQuestionnaireId = Session.get("questionnaireToStartId");
       var currentUserId = Meteor.userId();

       if(currentQuestionnaireId && currentUserId){
           var currentSurveyId = Surveys.insert({
               questionnaireId: currentQuestionnaireId,
               userId: currentUserId,
               startDate: new Date(),
               location:{
                   address: t.find("#survey-address").value,
                   latitude: t.find("#survey-geo-latitude").value,
                   longitude: t.find("#survey-geo-longitude").value
               },
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
       $("#start-survey-modal").modal("hide");
       Notify.user("New Survey Started", "A new survey has been started", Meteor.userId());

       Router.go('/complete_survey/' + Session.get("currentSurveyId"));
   }
});

Template.startSurveyModal.onRendered(function(){
    $.material.init();
});

