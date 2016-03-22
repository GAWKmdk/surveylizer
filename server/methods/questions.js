Meteor.methods({
    "updateQuestion": function(questionObj){
        questionObj.save();
    },
    "deleteQuestion": function(questionObj){
        questionObj.remove();
    }
});