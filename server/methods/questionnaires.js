Meteor.methods({
    "updateQuestionnaire": function(questionnaireObj){
        questionnaireObj.save();
    },
    "deleteQuestionnaire": function(questionnaireObj){
        questionnaireObj.remove();
    }
});