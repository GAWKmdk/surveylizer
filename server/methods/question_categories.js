Meteor.methods({
    "updateQuestionCategory": function(categoryObj){
        categoryObj.save();
    },
    "deleteQuestionCategory": function(categoryObj){
        categoryObj.remove();
    }
});