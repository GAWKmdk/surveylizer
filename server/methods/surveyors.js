Meteor.methods({
    "updateSurveyor": function(surveyorObj){
        surveyorObj.save();
    },
    "deleteSurveyor": function(surveyorObj){
        surveyorObj.remove();
    }
});