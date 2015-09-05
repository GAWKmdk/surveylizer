Template.questions.helpers({
    questionTypes: function(){
        return questionTypes.find();
    },
    questionCategories: function(){
        return questionCategories.find();
    },
    selectedQuestionCategory: function(){
        return Session.equals("selectedQuestionCategoryId", this._id) ? "btn-primary" : "";
    },
    isQuestionCategorySelected: function(){
        return Session.get("selectedQuestionCategoryId") ? true : false;
    }
});

Template.questions.events({
    'click form#new-question-category-form .input-group-addon': function(e, t){
        $("#new-question-category-form").trigger("submit");
    },
    'submit #new-question-category-form': function(e, t){
        e.preventDefault();
        this.questionCategory.set({
            name: t.find("#new-question-category-name").value
        });

        if(this.questionCategory.validateAll()){
            this.questionCategory.save();
            t.find("#new-question-category-form").reset();
            toastr.success("Question Category successfully created!");
        }

        return false;
    },
    'click #question-categories-list tr': function(e, t){
        Session.equals("selectedQuestionCategoryId", this._id) ?
            Session.set("selectedQuestionCategoryId", null) : Session.set("selectedQuestionCategoryId", this._id);
    }
});


Template.editQuestionCategoryModal.helpers({
    selectedQuestionCategory: function(){
        this.selectedQuestionCategory = questionCategories.findOne({_id: Session.get("selectedQuestionCategoryId")})
        return this.selectedQuestionCategory;
    }
});

Template.editQuestionCategoryModal.events({
    "submit #edit-question-category-modal form": function(e, t){
        e.preventDefault();

        var selectedQuestionCategoryId = Session.get("selectedQuestionCategoryId");

        if(selectedQuestionCategoryId){

            this.selectedQuestionCategory.set({
                _id: selectedQuestionCategoryId,
                name: t.find("#edit-question-category-name").value
            });

            if(this.selectedQuestionCategory.validateAll()){
                this.selectedQuestionCategory.save();
                $("#edit-question-category-modal").modal('hide');
                toastr.success("Question Category successfully edited!");
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteQuestionCategoryModal.helpers({
    selectedQuestionCategory: function(){
        return questionCategories.findOne({_id: Session.get("selectedQuestionCategoryId")});
    }
});

Template.deleteQuestionCategoryModal.events({
    "submit #delete-question-category-modal form": function(e, t){
        e.preventDefault();

        var selectedQuestionCategoryId = Session.get("selectedQuestionCategoryId");

        if(selectedQuestionCategoryId){
            questionCategories.remove({_id: selectedQuestionCategoryId}, function(err){
                if (err) {
                    Session.set("errorMessage", err.reason);
                    toastr.error(err.reason);
                } else {
                    $("#delete-question-category-modal").modal('hide');
                    toastr.success("Question Category successfully deleted!");
                    Session.set("selectedQuestionCategoryId", null);
                }
            });
        }

        // Prevent form reload
        return false;
    }
});