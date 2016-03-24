Meteor.methods({
    "addOrUpdateAnswer": function (answerObj) {
        answerObj.save();
    },
    "deleteAnswer": function (answerObj) {
        answerObj.remove();
    }
});