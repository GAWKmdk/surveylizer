Meteor.methods({
    "updateQuestion": function(questionObj){
        questionObj.save();
    },
    "deleteQuestion": function(questionObj){
        // TODO: @tsega Delete Question Answers as well
        questionObj.remove();
    }
});