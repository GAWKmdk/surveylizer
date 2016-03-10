Template.questions.created = function () {
    this.pagination = new Meteor.Pagination(QuestionCategories, {
        sort: {
            name: 1
        }
    });
};

Template.questions.helpers({
    questionTypes: function () {
        return QuestionTypes.find();
    },
    templatePagination: function () {
        return Template.instance().pagination;
    },
    questionCategories: function () {
        return Template.instance().pagination.getPage();
    },
    selectedQuestionCategory: function () {
        return Session.equals("selectedQuestionCategoryId", this._id) ? "active" : "";
    },
    canEditQuestionCategory: function () {
        return Session.get("selectedQuestionCategoryId") ? "" : "disabled";
    }
});

Template.questions.events({
    "click form#new-question-category-form button": function (e, t) {
        $("#new-question-category-form").trigger("submit");
    },
    "submit #new-question-category-form": function (e, t) {
        e.preventDefault();
        var questionCategoryDoc = {
            name: t.find("#new-question-category-name").value
        };

        this.questionCategory.set(questionCategoryDoc);
        var newQuestionCategory = new QuestionCategory(questionCategoryDoc);

        if (this.questionCategory.validate()) {
            newQuestionCategory.save();
            t.find("#new-question-category-form").reset();
            toastr.success("Question Category successfully created!");
        }

        return false;
    },
    "click #question-categories-list tr": function (e, t) {
        Session.equals("selectedQuestionCategoryId", this._id) ?
            Session.set("selectedQuestionCategoryId", null) : Session.set("selectedQuestionCategoryId", this._id);
    }
});


Template.editQuestionCategoryModal.helpers({
    selectedQuestionCategory: function () {
        this.selectedQuestionCategory = QuestionCategories.findOne({_id: Session.get("selectedQuestionCategoryId")})
        return this.selectedQuestionCategory;
    }
});

Template.editQuestionCategoryModal.events({
    "submit #edit-question-category-modal form": function (e, t) {
        e.preventDefault();

        var selectedQuestionCategoryId = Session.get("selectedQuestionCategoryId");

        if (selectedQuestionCategoryId) {

            this.selectedQuestionCategory.set({
                _id: selectedQuestionCategoryId,
                name: t.find("#edit-question-category-name").value
            });

            if (this.selectedQuestionCategory.validate()) {
                this.selectedQuestionCategory.save();
                $("#edit-question-category-modal").modal("hide");
                toastr.success("Question Category successfully edited!");
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteQuestionCategoryModal.helpers({
    selectedQuestionCategory: function () {
        return QuestionCategories.findOne({_id: Session.get("selectedQuestionCategoryId")});
    }
});

Template.deleteQuestionCategoryModal.events({
    "click #delete-question-category": function (e, t) {
        e.preventDefault();

        var selectedQuestionCategoryId = Session.get("selectedQuestionCategoryId");

        if (selectedQuestionCategoryId) {
            QuestionCategories.remove({_id: selectedQuestionCategoryId}, function (err) {
                if (err) {
                    Session.set("errorMessage", err.reason);
                    toastr.error(err.reason);
                } else {
                    $("#delete-question-category-modal").modal("hide");
                    toastr.success("Question Category successfully deleted!");
                    Session.set("selectedQuestionCategoryId", null);
                }
            });
        }
    }
});
