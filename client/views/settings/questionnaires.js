Template.questionnaires.helpers({
    questionnaires: function () {
        return questionnaires.find();
    },
    selectedQuestionnaire: function () {
        return Session.equals("selectedQuestionnaireId", this._id) ? "btn-primary" : "";
    },
    isQuestionnaireSelected: function () {
        return Session.get("selectedQuestionnaireId");
    }
});

Template.questionnaires.events({
    "click table#questionnaires-list tr": function (e, t) {
        Session.equals("selectedQuestionnaireId", this._id) ?
            Session.set("selectedQuestionnaireId", null) : Session.set("selectedQuestionnaireId", this._id);
    },
    "click #new-questionnaire-form .btn-clear": function (e, t) {
        this.questionnaire._errors.clear();
        t.find("#new-questionnaire-form").reset();
    },
    "submit #new-questionnaire-form": function (e, t) {
        e.preventDefault();

        var questionnaireDoc = {
            name: t.find("#new-questionnaire-name").value,
            code: t.find("#new-questionnaire-code").value,
            description: t.find("#new-questionnaire-description").value
        };

        this.questionnaire.set(questionnaireDoc);

        if (this.questionnaire.validateAll()) {
            this.questionnaire.save();
            // Notify the user
            Notify.user("New Questionnaire Created", "A new questionnaire has been created!", Meteor.userId());
            t.find("#new-questionnaire-form").reset();
            toastr.success("Questionnaire successfully created!");
        }

        // Prevent form reload
        return false;
    }
});

Template.editQuestionnaireModal.helpers({
    "selectedQuestionnaire": function () {
        this.selectedQuestionnaire = questionnaires.findOne({_id: Session.get("selectedQuestionnaireId")});
        return this.selectedQuestionnaire;
    }
});

Template.editQuestionnaireModal.events({
    "submit #edit-questionnaire-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireId = Session.get("selectedQuestionnaireId");

        if (selectedQuestionnaireId) {
            var questionnaireDoc = {
                _id: selectedQuestionnaireId,
                name: t.find("#edit-questionnaire-name").value,
                code: t.find("#edit-questionnaire-code").value,
                description: t.find("#edit-questionnaire-description").value
            };

            this.selectedQuestionnaire.set(questionnaireDoc);

            if (this.selectedQuestionnaire.validateAll()) {
                this.selectedQuestionnaire.save();
                $("#edit-questionnaire-modal").modal('hide');
                toastr.success("Questionnaire successfully edited!");
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteQuestionnaireModal.helpers({
    "selectedQuestionnaire": function () {
        return questionnaires.findOne({_id: Session.get("selectedQuestionnaireId")});
    }
});

Template.deleteQuestionnaireModal.events({
    "submit #delete-questionnaire-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireId = Session.get("selectedQuestionnaireId");

        if (selectedQuestionnaireId) {
            var questionnaire = questionnaires.findOne({_id: selectedQuestionnaireId});
            questionnaire.remove();
            Session.set("selectedQuestionnaireId", null);
            $("#delete-questionnaire-modal").modal('hide');
            toastr.success("Questionnaire successfully deleted!");
        }

        // Prevent form reload
        return false;
    }
});

Template.questionnaireQuestions.helpers({
    "questionTypes": function () {
        return questionTypes.find();
    },
    "questionCategories": function () {
        return questionCategories.find();
    },
    "questionnaireQuestions": function () {
        return questions.find({questionnaireId: Session.get("selectedQuestionnaireId")}, {sort: {orderNumber: 1}});
    },
    "selectedQuestionnaireQuestion": function () {
        return Session.equals("selectedQuestionnaireQuestionId", this._id) ? "btn-primary" : "";
    },
    "isQuestionnaireQuestionSelected": function () {
        return Session.get("selectedQuestionnaireQuestionId");
    },
    "type": function () {
        return questionTypes.findOne({_id: this.typeId});
    },
    "category": function () {
        return questionCategories.findOne({_id: this.categoryId});
    }
});

Template.questionnaireQuestions.events({
    "click table#questionnaire-questions-list tr": function (e, t) {
        Session.equals("selectedQuestionnaireQuestionId", this._id) ?
            Session.set("selectedQuestionnaireQuestionId", null) : Session.set("selectedQuestionnaireQuestionId", this._id);
    },
    "click #new-questionnaire-question-form .btn-clear": function (e, t) {
        Template.parentData(1).question._errors.clear();
        t.find("#new-questionnaire-question-form").reset();
    },
    "submit #new-questionnaire-question-form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireId = Session.get("selectedQuestionnaireId");

        if (selectedQuestionnaireId) {
            var questionDoc = {
                questionnaireId: Session.get("selectedQuestionnaireId"),
                typeId: t.find("#new-questionnaire-question-type").value != "empty" ?
                    t.find("#new-questionnaire-question-type").value : "",
                categoryId: t.find("#new-questionnaire-question-category").value != "empty" ?
                    t.find("#new-questionnaire-question-category").value : "",
                orderNumber: t.find("#new-questionnaire-question-order-number").value != "" ?
                    t.find("#new-questionnaire-question-order-number").value : null,
                detail: t.find("#new-questionnaire-question-detail").value
            };

            this.question.set(questionDoc);

            if (this.question.validateAll()) {
                this.question.save();
                t.find("#new-questionnaire-question-form").reset();
                toastr.success("Question successfully created!");
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.editQuestionnaireQuestionModal.helpers({
    "selectedQuestion": function () {
        this.selectedQuestion = questions.findOne({_id: Session.get("selectedQuestionnaireQuestionId")});
        return this.selectedQuestion;
    },
    "questionTypes": function () {
        return questionTypes.find();
    },
    "questionCategories": function () {
        return questionCategories.find();
    },
    "isQuestionType": function (typeOfQuestion) {
        var questionType = questionTypes.findOne({_id: this.typeId});
        return questionType.name == typeOfQuestion;
    },
    "isQuestionTypeSelected": function () {
        return this._id == Template.parentData(1).typeId ? "selected" : "";
    },
    "isQuestionCategorySelected": function () {
        return this._id == Template.parentData(1).categoryId ? "selected" : "";
    }
});

Template.choices.onRendered(function () {
    $.material.radio();
});

Template.choices.helpers({
    "choices": function () {
        return Template.parentData(0).choices;
    },
    "selectedChoiceType": function (choiceType) {
        var selectedQuestion = questions.findOne({_id: Session.get("selectedQuestionnaireQuestionId")});
        return selectedQuestion.choiceType == choiceType ? "checked" : "";
    }
});

Template.choices.events({
    "click #add-choice": function (e, t) {
        e.preventDefault();

        var orderNumber = t.find("#new-question-choice-order-number").value,
            name = t.find("#new-question-choice-name").value;

        if (orderNumber && name) {
            var doc = {
                orderNumber: orderNumber,
                name: name
            };

            questions.update({_id: this._id}, {$addToSet: {choices: doc}}, function (err) {
                if (err) {
                    toastr.error(err.reason);
                }
            });

            $("#choice-form input[type=text]").val("");
        }
    },
    "click .delete-choice": function (e, t) {
        e.preventDefault();

        var doc = {
            orderNumber: this.orderNumber,
            name: this.name
        };

        questions.update({_id: Session.get("selectedQuestionnaireQuestionId")}, {$pull: {choices: doc}}, function (err) {
            if (err) {
                Session.set("errorMessage", err.reason);
            }
        });
    }
});

Template.editQuestionnaireQuestionModal.events({
    "submit #edit-questionnaire-question-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireQuestionId = Session.get("selectedQuestionnaireQuestionId");

        if (selectedQuestionnaireQuestionId) {

            var questionDoc = {
                _id: selectedQuestionnaireQuestionId,
                typeId: t.find("#edit-questionnaire-question-type").value != "empty" ?
                    t.find("#edit-questionnaire-question-type").value : null,
                categoryId: t.find("#edit-questionnaire-question-category").value != "empty" ?
                    t.find("#edit-questionnaire-question-category").value : null,
                orderNumber: t.find("#edit-questionnaire-question-order-number").value != "" ?
                    t.find("#edit-questionnaire-question-order-number").value : null,
                detail: t.find("#edit-questionnaire-question-detail").value,
                choiceType: t.find("#edit-questionnaire-question-single-choice") &&
                t.find("#edit-questionnaire-question-single-choice").checked ? "Single" : "Multiple"
            };

            this.selectedQuestion.set(questionDoc);

            if (this.selectedQuestion.validateAll()) {
                this.selectedQuestion.save();
                $("#edit-questionnaire-question-modal").modal('hide');
                toastr.success("Question successfully edited!");
            }

        }

        // Prevent form reload
        return false;
    }
});

Template.deleteQuestionnaireQuestionModal.helpers({
    "selectedQuestionnaireQuestion": function () {
        return questions.findOne({_id: Session.get("selectedQuestionnaireQuestionId")});
    }
});

Template.deleteQuestionnaireQuestionModal.events({
    "submit #delete-questionnaire-question-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireQuestionId = Session.get("selectedQuestionnaireQuestionId");

        if (selectedQuestionnaireQuestionId) {
            questions.remove({_id: selectedQuestionnaireQuestionId}, function (err) {
                if (err) {
                    Session.set("errorMessage", err.reason);
                } else {
                    // TODO: @tsega Delete Question Answers as well
                    Session.set("selectedQuestionnaireQuestionId", null);
                    $("#delete-questionnaire-question-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});