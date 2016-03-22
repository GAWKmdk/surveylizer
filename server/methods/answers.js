Meteor.methods({
    "updateAnswer": function(answerObj){
        answerObj.save();
    },
    "deleteAnswer": function(answerObj){
        answerObj.remove();
    }
});