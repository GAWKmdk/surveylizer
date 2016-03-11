Template.questionnaires.created = function () {
    this.pagination = new Meteor.Pagination(Questionnaires, {
        sort: {
            name: 1
        }
    });
};

Template.questionnaires.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    questionnaires: function () {
        if (Session.get("questionnaireSearchAttr") && Session.get("questionnaireSearchValue")) {
            var searchFilter = {};
            var searchObject = {
                $regex: Session.get("questionnaireSearchValue"), $options: 'i'
            };
            searchFilter[Session.get("questionnaireSearchAttr")] = searchObject;

            Template.instance().pagination.filters(searchFilter);
        } else {
            Template.instance().pagination.filters({});
        }
        return Template.instance().pagination.getPage();
    },
    selectedQuestionnaire: function () {
        return Session.equals("selectedQuestionnaireId", this._id) ? "active" : "";
    },
    isQuestionnaireSelected: function () {
        return Session.get("selectedQuestionnaireId");
    },
    canEditQuestionnaire: function () {
        return Session.get("selectedQuestionnaireId") ? "" : "disabled";
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
        var newQuestionnaire = new Questionnaire(questionnaireDoc);

        if (this.questionnaire.validate()) {
            newQuestionnaire.save();
            // Notify the user
            Notify.user("New Questionnaire Created", "A new questionnaire has been created!", Meteor.userId());
            t.find("#new-questionnaire-form").reset();
            toastr.success("Questionnaire successfully created!");
        }

        // Prevent form reload
        return false;
    },
    "click table#questionnaires-list thead td": function (e, t) {
        if(!$(e.target).hasClass("disabled")){
            t.$("table thead td.active").removeClass("active");
            t.$(e.target).addClass("active");

            Session.set("questionnaireSearchAttr", $(e.target).data("search-name"));
        }
    },
    "keyup input#search-questionnaires": function (e, t) {
        $("#search-questionnaires-form").trigger("submit");
    },
    "submit #search-questionnaires-form": function (e, t) {
        e.preventDefault();

        var searchTerm = t.find("#search-questionnaires").value;
        if (searchTerm) {
            Session.set("questionnaireSearchValue", searchTerm);
        } else {
            Session.set("questionnaireSearchValue", null);
        }
        return false;
    }
});

Template.questionnaires.onRendered(function () {
    Session.set("questionnaireSearchAttr", $("table thead td.active").data("search-name"));
});

Template.editQuestionnaireModal.helpers({
    "selectedQuestionnaire": function () {
        this.selectedQuestionnaire = Questionnaires.findOne({_id: Session.get("selectedQuestionnaireId")});
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

            if (this.selectedQuestionnaire.validate()) {
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
        return Questionnaires.findOne({_id: Session.get("selectedQuestionnaireId")});
    }
});

Template.deleteQuestionnaireModal.events({
    "submit #delete-questionnaire-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireId = Session.get("selectedQuestionnaireId");

        if (selectedQuestionnaireId) {
            var questionnaire = Questionnaires.findOne({_id: selectedQuestionnaireId});
            questionnaire.remove();
            Session.set("selectedQuestionnaireId", null);
            $("#delete-questionnaire-modal").modal('hide');
            toastr.success("Questionnaire successfully deleted!");
        }

        // Prevent form reload
        return false;
    }
});

Template.questionnaireQuestions.created = function () {
    this.pagination = new Meteor.Pagination(Questions, {
        sort: {
            name: 1
        }
    });
};

Template.questionnaireQuestions.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    questionnaireQuestions: function () {
        if (Session.get("questionSearchAttr") && Session.get("questionSearchValue")) {
            var searchFilter = {};
            var searchObject;

            if (Session.get("questionSearchAttr") == "orderNumber") {
                searchFilter = {$where: "/.*" + Session.get("questionSearchValue") + ".*/.test(this.orderNumber)"};
            } else {
                searchObject = {
                    $regex: Session.get("questionSearchValue"), $options: 'i'
                };
                searchFilter[Session.get("questionSearchAttr")] = searchObject;
            }

            searchFilter["questionnaireId"] = Session.get("selectedQuestionnaireId");

            Template.instance().pagination.filters(searchFilter);
        } else {
            Template.instance().pagination.filters({
                questionnaireId: Session.get("selectedQuestionnaireId")
            });
        }

        Template.instance().pagination.sort({
            orderNumber: 1
        });

        return Template.instance().pagination.getPage();
    },
    questionTypes: function () {
        return QuestionTypes.find();
    },
    questionCategories: function () {
        return QuestionCategories.find();
    },
    selectedQuestionnaireQuestion: function () {
        return Session.equals("selectedQuestionnaireQuestionId", this._id) ? "active" : "";
    },
    canEditQuestionnaireQuestion: function () {
        return Session.get("selectedQuestionnaireQuestionId") ? "" : "disabled";
    },
    type: function () {
        return QuestionTypes.findOne({_id: this.typeId});
    },
    category: function () {
        return QuestionCategories.findOne({_id: this.categoryId});
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
            var newQuestion = new Question(questionDoc);

            if (this.question.validate()) {
                newQuestion.save();
                t.find("#new-questionnaire-question-form").reset();
                toastr.success("Question successfully created!");
            }
        }

        // Prevent form reload
        return false;
    },
    "click table#questionnaire-questions-list thead td": function (e, t) {
        if(!$(e.target).hasClass("disabled")){
            t.$("table thead td.active").removeClass("active");
            t.$(e.target).addClass("active");

            Session.set("questionSearchAttr", $(e.target).data("search-name"));
        }
    },
    "keyup input#search-questions": function (e, t) {
        $("#search-questions-form").trigger("submit");
    },
    "submit #search-questions-form": function (e, t) {
        e.preventDefault();

        var searchTerm = t.find("#search-questions").value;
        if (searchTerm) {
            Session.set("questionSearchValue", searchTerm);
        } else {
            Session.set("questionSearchValue", null);
        }
        return false;
    }
});

Template.questionnaireQuestions.onRendered(function () {
    Session.set("questionSearchAttr", $("table thead td.active").data("search-name"));
});

Template.editQuestionnaireQuestionModal.helpers({
    selectedQuestion: function () {
        this.selectedQuestion = Questions.findOne({_id: Session.get("selectedQuestionnaireQuestionId")});
        return this.selectedQuestion;
    },
    questionTypes: function () {
        return QuestionTypes.find();
    },
    questionCategories: function () {
        return QuestionCategories.find();
    },
    isQuestionType: function (typeOfQuestion) {
        var questionType = QuestionTypes.findOne({_id: this.typeId});
        return questionType.name == typeOfQuestion;
    },
    isQuestionTypeSelected: function () {
        return this._id == Template.parentData(1).typeId ? "selected" : "";
    },
    isQuestionCategorySelected: function () {
        return this._id == Template.parentData(1).categoryId ? "selected" : "";
    }
});

Template.choices.onRendered(function () {
    $.material.radio();
});

Template.choices.helpers({
    choices: function () {
        return Template.parentData(0).choices;
    },
    selectedChoiceType: function (choiceType) {
        var selectedQuestion = Questions.findOne({_id: Session.get("selectedQuestionnaireQuestionId")});
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

            Questions.update({_id: this._id}, {$addToSet: {choices: doc}}, function (err) {
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

        Questions.update({_id: Session.get("selectedQuestionnaireQuestionId")}, {$pull: {choices: doc}}, function (err) {
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

            if (this.selectedQuestion.validate()) {
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
    selectedQuestionnaireQuestion: function () {
        return Questions.findOne({_id: Session.get("selectedQuestionnaireQuestionId")});
    }
});

Template.deleteQuestionnaireQuestionModal.events({
    "submit #delete-questionnaire-question-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionnaireQuestionId = Session.get("selectedQuestionnaireQuestionId");

        if (selectedQuestionnaireQuestionId) {
            Questions.remove({_id: selectedQuestionnaireQuestionId}, function (err) {
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
