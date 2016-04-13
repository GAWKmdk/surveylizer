completeSurvey = function () {
    var surveyToCompleteId = Session.get("surveyToCompleteId");

    if (surveyToCompleteId) {
        Surveys.update({_id: surveyToCompleteId}, {
            $set: {
                endDate: new Date(),
                status: Meteor.settings.public.surveyStatusFinished
            }
        });
        Notify.user(i18n('notificationSurveyCompletedTitle'), i18n('notificationSurveyCompletedDetail'), Meteor.userId());
    }
};

newAnswer = function (questionId, value, choiceOrderNumber) {
    var surveyToCompleteId = Session.get("surveyToCompleteId");
    var question = Question.findOne({_id: questionId});
    var answerDoc = {
        surveyId: surveyToCompleteId,
        userId: Meteor.userId(),
        questionId: questionId,
        questionOrderNumber: question.orderNumber,
        questionDetail: question.detail,
        value: value,
        choiceOrderNumber: choiceOrderNumber,
        answeredOn: new Date()
    };

    var answerObj = Answers.findOne({
            surveyId: answerDoc.surveyId,
            userId: answerDoc.userId,
            questionId: answerDoc.questionId,
            choiceOrderNumber: answerDoc.choiceOrderNumber ? answerDoc.choiceOrderNumber : 0
        });

    if (answerObj) {
        answerObj.set(answerDoc);
    } else {
        answerObj = new Answer();
        answerObj.set(answerDoc);
    }

    Meteor.call("addOrUpdateAnswer", answerObj, function (err) {
        if (err) {
            toastr.error(err.reason);
        }
    });
};

submitAnswer = function (template, question) {
    // Get all the answers first
    if (question.isTypeOpenEnded()) {
        // Just get the value of the textarea
        var answerValue = template.$("textarea.answer")[0].value;
        newAnswer(question._id, answerValue);
    } else {
        // Multiple Choice Answers
        var answers = template.$(".answer input:checked");
        if (answers.length > 0) {
            answers.each(function () {
                newAnswer(question._id, $(this).val(), $(this).data('order-number'));
            });
        }
    }
};

Template.completeSurvey.helpers({
    "surveyToComplete": function () {
        return Surveys.findOne({_id: Session.get("surveyToCompleteId")});
    }
});

Template.question.helpers({
    "currentQuestion": function () {
        return this.currentQuestion();
    },
    "canNavigateBackward": function () {
        return Template.parentData(1).canNavigateBackward();
    },
    "canNavigateForward": function () {
        return Template.parentData(1).canNavigateForward();
    },
    "lastQuestion": function () {
        return Template.parentData(1).orderNumber == Template.parentData(1).totalNumberOfQuesitons();
    },
    "previousAnswer": function () {
        var previousAnswer = this.answer(Session.get("surveyToCompleteId"));
        return previousAnswer ? previousAnswer.value : null;
    }
});

Template.question.events({
    "click #next-question": function (e, t) {
        var question = this;
        submitAnswer(t, question);

        // Move to the next question
        Template.parentData(0).moveForward();
    },
    "click #previous-question": function (e, t) {
        Template.parentData(0).moveBackward();
    },
    "click #finish-survey": function (e, t) {
        var question = this;
        submitAnswer(t, question);

        // Mark survey as completed
        completeSurvey();
        Router.go("/completed_surveys");
    }
});

Template.textareaInput.onRendered(function () {
    $.material.init();
});

Template.textareaInput.helpers({
    "previousAnswer": function () {
        var previousAnswer = this.answer(Session.get("surveyToCompleteId"));
        return previousAnswer ? previousAnswer.value : null;
    }
});

Template.radioInput.onRendered(function () {
    $.material.radio();
});

Template.radioInput.helpers({
    "previousChoice": function (choiceOrderNumber) {
        var previousChoice = Template.parentData(1).choiceAnswer(Session.get("surveyToCompleteId"), choiceOrderNumber);
        return previousChoice ? "checked" : "";
    }
});

Template.radioInput.events({
    "change input": function (e, t) {
        if (!e.currentTarget.checked) {
            var choiceOrderNumber = e.currentTarget.dataset.orderNumber;
            var previousChoice = Template.parentData(1).choiceAnswer(Session.get("surveyToCompleteId"), choiceOrderNumber);
            if (previousChoice) {
                var answerObj = Answers.findOne({_id: previousChoice._id});

                Meteor.call("deleteAnswer", answerObj, function (err) {
                    if (err) {
                        toastr.error(err.message);
                    }
                });
            }
        }
    }
});

Template.checkboxInput.onRendered(function () {
    $.material.checkbox();
});

Template.checkboxInput.helpers({
    "previousChoice": function (choiceOrderNumber) {
        var previousChoice = Template.parentData(1).choiceAnswer(Session.get("surveyToCompleteId"), choiceOrderNumber);
        return previousChoice ? "checked" : "";
    }
});

Template.checkboxInput.events({
    "change input": function (e, t) {
        if (!e.currentTarget.checked) {
            var choiceOrderNumber = e.currentTarget.dataset.orderNumber;
            var previousChoice = Template.parentData(1).choiceAnswer(Session.get("surveyToCompleteId"), choiceOrderNumber);
            if (previousChoice) {
                var answerObj = Answers.findOne({_id: previousChoice._id});

                Meteor.call("deleteAnswer", answerObj, function (err) {
                    if (err) {
                        toastr.error(err.message);
                    }
                });
            }

        }
    }
});
