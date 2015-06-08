Template.surveys.helpers({
    surveys: function(){
        return surveys.find();
    },
    selectedSurvey: function(){
        return Session.equals("selectedSurveyId", this._id) ? "btn-primary" : "";
    },
    isSurveySelected: function(){
        return Session.get("selectedSurveyId");
    }
});

Template.surveys.events({
    "click table#surveys-list tr": function(e, t){
        Session.equals("selectedSurveyId", this._id) ?
            Session.set("selectedSurveyId", null) : Session.set("selectedSurveyId", this._id) ;
    },
    "click .btn-clear": function(e, t){
        t.find("#new-survey-name").value = "";
        t.find("#new-survey-code").value = "";
        t.find("#new-survey-description").value = "";
    },
    "submit #new-survey-form": function(e, t){
        e.preventDefault();

        var name = t.find("#new-survey-name").value,
            code = t.find("#new-survey-code").value,
            description = t.find("#new-survey-description").value;

        if(name && code && description){
            surveys.insert({
                name: name,
                code: code,
                description: description
            });

            t.find("#new-survey-name").value = "";
            t.find("#new-survey-code").value = "";
            t.find("#new-survey-description").value = "";
        }

        // Prevent form reload
        return false;
    }
});

Template.editSurveyModal.helpers({
    "selectedSurvey": function(){
        return surveys.findOne({_id: Session.get("selectedSurveyId")});
    }
});

Template.editSurveyModal.events({
    "submit #edit-survey-modal form": function(e, t){
        e.preventDefault();

        // Get profile values
        var name = t.find("#edit-survey-name").value,
            code = t.find("#edit-survey-code").value,
            description = t.find("#edit-survey-description").value;

        if(name && code && description){
            var doc = {
                name: name,
                code: code,
                description: description
            };

            var selectedSurveyId = Session.get("selectedSurveyId");

            if(selectedSurveyId){
                surveys.update({_id: selectedSurveyId}, {$set: doc}, function(err){
                    if (err) {
                        // Handle any errors, also checks for uniqueness of email address
                        Session.set("errorMessage", err.reason);
                    } else {
                        $("#edit-survey-modal").modal('hide');
                    }
                });
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteSurveyModal.helpers({
    "selectedSurvey": function(){
        return surveys.findOne({_id: Session.get("selectedSurveyId")});
    }
});

Template.deleteSurveyModal.events({
    "submit #delete-survey-modal form": function(e, t){
        e.preventDefault();

        var selectedSurveyId = Session.get("selectedSurveyId");

        if(selectedSurveyId){
            surveys.remove({_id: selectedSurveyId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                    console.log(err.reason);
                } else {
                    //TODO: @tsega Delete Survey Questions as well
                    Session.set("selectedSurveyId", null);
                    $("#delete-survey-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.surveyQuestions.helpers({
    "questionTypes": function(){
        return questionTypes.find();
    },
    "questionCategories": function(){
        return questionCategories.find();
    },
    "surveyQuestions": function(){
        return questions.find({surveyId: Session.get("selectedSurveyId")}, {sort: {orderNumber: 1}});
    },
    "selectedSurveyQuestion": function(){
        return Session.equals("selectedSurveyQuestionId", this._id) ? "btn-primary" : "";
    },
    "isSurveyQuestionSelected": function(){
        return Session.get("selectedSurveyQuestionId");
    },
    "type": function(){
        return questionTypes.findOne({_id: this.typeId});
    },
    "category": function(){
        return questionCategories.findOne({_id: this.categoryId});
    }
});

Template.surveyQuestions.events({
    "click table#survey-questions-list tr": function(e, t){
        Session.equals("selectedSurveyQuestionId", this._id) ?
            Session.set("selectedSurveyQuestionId", null) : Session.set("selectedSurveyQuestionId", this._id) ;
    },
    "click .btn-clear": function(e, t){
        t.find("#new-survey-question-type").selectedIndex = 0;
        t.find("#new-survey-question-category").selectedIndex = 0;
        t.find("#new-survey-question-order-number").value = "";
        t.find("#new-survey-question-detail").value = "";
    },
    "submit #new-survey-question-form": function(e, t){
        e.preventDefault();

        var typeId = t.find("#new-survey-question-type").value,
            categoryId = t.find("#new-survey-question-category").value,
            orderNumber = t.find("#new-survey-question-order-number").value,
            detail = t.find("#new-survey-question-detail").value;

        var selectedSurveyId = Session.get("selectedSurveyId");

        if(selectedSurveyId && typeId && categoryId && orderNumber && detail){
            questions.insert({
                surveyId: selectedSurveyId,
                typeId: typeId,
                categoryId: categoryId,
                orderNumber: orderNumber,
                detail: detail,
                choices: [],
                choiceType: ''
            });

            t.find("#new-survey-question-type").selectedIndex = 0;
            t.find("#new-survey-question-category").selectedIndex = 0;
            t.find("#new-survey-question-order-number").value = "";
            t.find("#new-survey-question-detail").value = "";
        }

        // Prevent form reload
        return false;
    }
});

Template.editSurveyQuestionModal.helpers({
    "selectedSurveyQuestion": function(){
        return questions.findOne({_id: Session.get("selectedSurveyQuestionId")});
    },
    "questionTypes": function(){
        return questionTypes.find();
    },
    "questionCategories": function(){
        return questionCategories.find();
    },
    "isQuestionType": function(typeOfQuestion){
        var questionType = questionTypes.findOne({_id: this.typeId});
        return questionType.name == typeOfQuestion;
    },
    "isQuestionTypeSelected": function(){
        return this._id == Template.parentData(1).typeId ? "selected" : "";
    },
    "isQuestionCategorySelected": function(){
        return this._id == Template.parentData(1).categoryId ? "selected" : "";
    }
});

Template.choices.onRendered(function() {
    $.material.radio();
});

Template.choices.helpers({
    "question": function(){
        return questions.findOne({_id: Session.get("selectedSurveyQuestion")}); //Template.parentData(1).choices;
    },
    "selectedChoiceType": function(choiceType){
        var selectedQuestion = questions.findOne({_id: Session.get("selectedSurveyQuestionId")});
        return selectedQuestion.choiceType == choiceType ? "checked" : "";
    }
});

Template.choices.events({
    "click #add-choice": function(e, t){
        e.preventDefault();

        var orderNumber = t.find("#new-question-choice-order-number").value,
            name = t.find("#new-question-choice-name").value;

        if(orderNumber && name) {
            var doc = {
                orderNumber: orderNumber,
                name: name
            };

            questions.update({_id: this._id}, {$addToSet: {choices: doc}}, function (err) {
                if (err) {
                    Session.set("errorMessage", err.reason);
                }
            });
        }
    },
    "click .delete-choice": function(e, t){
        e.preventDefault();

        var doc = {
            orderNumber: this.orderNumber,
            name: this.name
        };

        questions.update({_id: Session.get("selectedSurveyQuestionId")}, {$pull: {choices: doc}}, function (err) {
            if (err) {
                Session.set("errorMessage", err.reason);
            }
        });
    }
});

Template.editSurveyQuestionModal.events({
    "submit #edit-survey-question-modal form": function(e, t){
        e.preventDefault();

        var typeId = t.find("#edit-survey-question-type").value,
            categoryId = t.find("#edit-survey-question-category").value,
            orderNumber = t.find("#edit-survey-question-order-number").value,
            detail = t.find("#edit-survey-question-detail").value,
            choiceType = t.find("#edit-survey-question-single-choice").checked ? "Single" : "Multiple";


        if(typeId && categoryId && orderNumber && detail && choiceType){

            var doc = {
                typeId: typeId,
                categoryId: categoryId,
                orderNumber: orderNumber,
                detail: detail,
                choiceType: choiceType
            };

            var selectedSurveyQuestionId = Session.get("selectedSurveyQuestionId");

            if(selectedSurveyQuestionId){
                questions.update({_id: selectedSurveyQuestionId}, {$set: doc}, function(err){
                    if (err) {
                        // Handle any errors, also checks for uniqueness of email address
                        Session.set("errorMessage", err.reason);
                    } else {
                        $("#edit-survey-question-modal").modal('hide');
                    }
                });
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteSurveyQuestionModal.helpers({
    "selectedSurveyQuestion": function(){
        return questions.findOne({_id: Session.get("selectedSurveyQuestionId")});
    }
});

Template.deleteSurveyQuestionModal.events({
    "submit #delete-survey-question-modal form": function(e, t){
        e.preventDefault();

        var selectedSurveyQuestionId = Session.get("selectedSurveyQuestionId");

        if(selectedSurveyQuestionId){
            questions.remove({_id: selectedSurveyQuestionId}, function(err){
                if (err) {
                    Session.set("errorMessage", err.reason);
                } else {
                    // TODO: @tsega Delete Question Answers as well
                    Session.set("selectedSurveyQuestionId", null);
                    $("#delete-survey-question-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});