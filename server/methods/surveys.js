Meteor.methods({
    "updateSurvey": function (surveyObj) {
        surveyObj.save();
    },
    "deleteSurvey": function (surveyObj) {
        // TODO: @tsega remove answers as well
        surveyObj.remove();
    }
});