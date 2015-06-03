function newEntry(entry, entryType){
    //check(entry, nonEmptyString);

    if(entry){
        if(entryType == "question-type"){
            questionTypes.insert({
                name: entry
            });
        } else if(entryType == "question-category"){
            questionCategories.insert({
                name: entry
            });
        }

        $("#new-"+ entryType + "-name").val("");
    }
}

Template.questions.helpers({
    questionTypes: function(){
        return questionTypes.find();
    },
    questionCategories: function(){
        return questionCategories.find();
    },
    selectedQuestionType: function(){
        return Session.equals("selectedQuestionTypeId", this._id) ? "btn-primary" : "";
    },
    selectedQuestionCategory: function(){
        return Session.equals("selectedQuestionCategoryId", this._id) ? "btn-primary" : "";
    },
    isQuestionTypeSelected: function(){
        return Session.get("selectedQuestionTypeId") ? true : false;
    },
    isQuestionCategorySelected: function(){
        return Session.get("selectedQuestionCategoryId") ? true : false;
    }
});

Template.questions.events({
    'click form .input-group-addon': function(e, t){
        if(e.target.dataset.formType == "question-type"){
            $("#new-question-type-form").trigger("submit");
        } else {
            $("#new-question-category-form").trigger("submit");
        }
    },
    'keyup form input': function(e, t){
        if(e.which === 13){
            if(e.target.dataset.formType == "question-type"){
                $("#new-question-type-form").trigger("submit");
            } else {
                $("#new-question-category-form").trigger("submit");
            }
        }
    },
    'submit #new-question-type-form': function(e, t){
        e.preventDefault();
        var newName = t.find("#new-question-type-name").value;
        newEntry(newName, "question-type");
        return false;
    },
    'submit #new-question-category-form': function(e, t){
        e.preventDefault();
        var newName = t.find("#new-question-category-name").value;
        newEntry(newName, "question-category");
        return false;
    },
    'click #question-categories-list tr': function(e, t){
        Session.equals("selectedQuestionCategoryId", this._id) ?
            Session.set("selectedQuestionCategoryId", null) : Session.set("selectedQuestionCategoryId", this._id);
    },
    'click #question-types-list tr': function(e, t){
        Session.equals("selectedQuestionTypeId", this._id) ?
            Session.set("selectedQuestionTypeId", null) : Session.set("selectedQuestionTypeId", this._id);
    }
});

Template.editQuestionTypeModal.helpers({
    "selectedQuestionType": function(){
        return questionTypes.findOne({_id:Session.get("selectedQuestionTypeId")});
    }
});

Template.editQuestionTypeModal.events({
    "submit #edit-question-type-modal form": function(e, t){
        e.preventDefault();

        var name = t.find("#edit-question-type-name").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("nameHasError", null);

        // Trim field
        name = trimInput(name);

        // Errors Array
        var errors = [];

        // Validate name field
        try{
            check(name, nonEmptyString);
        } catch(e) {
            errors.push("<em>Name</em> is required.");
        }

        // Check if there are any errors
        if(errors.length){
            var error_messages = "";
            _.each(errors, function(error){
                error_messages += "<li>"+error+"</li>";
            });
            Session.set("errorMessage", "Please correct the following errors:" +
                "<ul>" +
                error_messages +
                "</ul>");
            return false;
        }

        // New user document
        var doc = {
            "name": name
        };

        var selectedQuestionTypeId = Session.get("selectedQuestionCategoryId");

        if(selectedQuestionTypeId){
            questionTypes.update({_id: selectedQuestionTypeId}, {$set: doc}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#edit-question-type-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteQuestionTypeModal.helpers({
    selectedQuestionType: function(){
        return questionTypes.findOne({_id: Session.get("selectedQuestionTypeId")});
    }
});

Template.deleteQuestionTypeModal.events({
    "submit #delete-question-type-modal form": function(e, t){
        e.preventDefault();

        var selectedQuestionTypeId = Session.get("selectedQuestionTypeId");

        if(selectedQuestionTypeId){
            questionTypes.remove({_id: selectedQuestionTypeId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#delete-question-type-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.editQuestionCategoryModal.helpers({
    selectedQuestionCategory: function(){
        return questionCategories.findOne({_id: Session.get("selectedQuestionCategoryId")});
    }
});

Template.editQuestionCategoryModal.events({
    "submit #edit-question-category-modal form": function(e, t){
        e.preventDefault();

        var name = t.find("#edit-question-category-name").value;

        // Clear Error Sessions
        Session.set("errorMessage", null);
        Session.set("nameHasError", null);

        // Trim field
        name = trimInput(name);

        // Errors Array
        var errors = [];

        // Validate name field
        try{
            check(name, nonEmptyString);
        } catch(e) {
            errors.push("<em>Name</em> is required.");
        }

        // Check if there are any errors
        if(errors.length){
            var error_messages = "";
            _.each(errors, function(error){
                error_messages += "<li>"+error+"</li>";
            });
            Session.set("errorMessage", "Please correct the following errors:" +
                "<ul>" +
                error_messages +
                "</ul>");
            return false;
        }

        // New user document
        var doc = {
            "name": name
        };

        var selectedQuestionCategoryId =Session.get("selectedQuestionCategoryId");

        if(selectedQuestionCategoryId){
            // Update the selected user
            questionCategories.update({_id: selectedQuestionCategoryId}, {$set: doc}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#edit-question-category-modal").modal('hide');
                }
            });
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

        var selectedQuestionCategoryId =Session.get("selectedQuestionCategoryId");

        if(selectedQuestionCategoryId){
            questionCategories.remove({_id: selectedQuestionCategoryId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#delete-question-category-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});