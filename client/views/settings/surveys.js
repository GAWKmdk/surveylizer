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
    "submit #new-survey-form": function(e, t){
        e.preventDefault();

        // Get permission name
        var name = t.find("#new-survey-name").value,
            code = t.find("#new-survey-code").value,
            description = t.find("#new-survey-description").value;

        if(name && code && description){
            surveys.insert({
                name: name,
                code: code,
                description: description
            });
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
                    $("#delete-survey-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});