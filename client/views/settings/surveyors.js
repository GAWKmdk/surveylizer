Template.surveyors.helpers({
    surveyors: function(){
        return surveyors.find();
    },
    selectedSurveyor: function(){
        return Session.equals("selectedSurveyorId", this._id) ? "btn-primary" : "";
    },
    isSurveyorSelected: function(){
        return Session.get("selectedSurveyorId");
    },
    fullName: function(){
        return this.firstName + " " + this.lastName;
    }
});

Template.surveyors.events({
    "click table#surveyors-list tr": function(e, t){
        Session.equals("selectedSurveyorId", this._id) ?
            Session.set("selectedSurveyorId", null) : Session.set("selectedSurveyorId", this._id) ;
    },
    "submit #new-surveyor-form": function(e, t){
        e.preventDefault();

        var firstName = t.find("#new-surveyor-first-name").value,
            lastName = t.find("#new-surveyor-last-name").value,
            position = t.find("#new-surveyor-position").value,
            email = t.find("#new-surveyor-email").value,
            telephone = t.find("#new-surveyor-telephone").value;

        if(firstName && lastName && position && email && telephone){
            surveyors.insert({
                firstName: firstName,
                lastName: lastName,
                position: position,
                email: email,
                telephone: telephone
            });
        }

        // Prevent form reload
        return false;
    }
});

Template.editSurveyorModal.helpers({
    "selectedSurveyor": function(){
        return surveyors.findOne({_id: Session.get("selectedSurveyorId")});
    }
});

Template.editSurveyorModal.events({
    "submit #edit-surveyor-modal form": function(e, t){
        e.preventDefault();

        var firstName = t.find("#edit-surveyor-first-name").value,
            lastName = t.find("#edit-surveyor-last-name").value,
            position = t.find("#edit-surveyor-position").value,
            email = t.find("#edit-surveyor-email").value,
            telephone = t.find("#edit-surveyor-telephone").value;

        if(firstName && lastName && position && email && telephone){

            var doc = {
                firstName: firstName,
                lastName: lastName,
                position: position,
                email: email,
                telephone: telephone
            };

            var selectedSurveyorId = Session.get("selectedSurveyorId");

            if(selectedSurveyorId){
                surveyors.update({_id: selectedSurveyorId}, {$set: doc}, function(err){
                    if (err) {
                        // Handle any errors, also checks for uniqueness of email address
                        Session.set("errorMessage", err.reason);
                    } else {
                        $("#edit-surveyor-modal").modal('hide');
                    }
                });
            }
        }

        // Prevent form reload
        return false;
    }
});

Template.deleteSurveyorModal.helpers({
    "selectedSurveyor": function(){
        return surveyors.findOne({_id: Session.get("selectedSurveyorId")});
    },
    "fullName": function(){
        return this.fistName + " " + this.lastName;
    }
});

Template.deleteSurveyorModal.events({
    "submit #delete-surveyor-modal form": function(e, t){
        e.preventDefault();

        var selectedSurveyorId = Session.get("selectedSurveyorId");

        if(selectedSurveyorId){
            surveyors.remove({_id: selectedSurveyorId}, function(err){
                if (err) {
                    // Handle any errors, also checks for uniqueness of email address
                    Session.set("errorMessage", err.reason);
                } else {
                    $("#delete-surveyor-modal").modal('hide');
                }
            });
        }

        // Prevent form reload
        return false;
    }
});