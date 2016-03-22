Meteor.methods({
    "updateSurvey": function(surveyObj){
        surveyObj.save();
    },
    "deleteSurvey": function(surveyObj){
        surveyObj.remove();
    }
});