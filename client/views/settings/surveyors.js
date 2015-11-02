surveyorsPaginator = new Paginator(surveyors, 10);

Template.surveyors.helpers({
  surveyorsPaginator: function(){
    return surveyorsPaginator;
  },
  surveyors: function(){
    return surveyorsPaginator.pagedItems({});
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

    var surveyorDoc = {
      _id: null,
      firstName: t.find("#new-surveyor-first-name").value,
      lastName: t.find("#new-surveyor-last-name").value,
      position: t.find("#new-surveyor-position").value,
      email: t.find("#new-surveyor-email").value,
      telephone: t.find("#new-surveyor-telephone").value
    };

    this.surveyor.set(surveyorDoc);
    var newSurveyor = new Surveyor(surveyorDoc);

    if(this.surveyor.validateAll()){
      newSurveyor.save();
      t.find("form").reset();
      toastr.success("Surveyor successfully created!");
    }

    // Prevent form reload
    return false;
  },
  "click button.btn-clear": function(e, t){
    t.find("#new-surveyor-form").reset();
  }
});

Template.editSurveyorModal.helpers({
  "selectedSurveyor": function(){
    this.selectedSurveyor = surveyors.findOne({_id: Session.get("selectedSurveyorId")});
    return this.selectedSurveyor;
  }
});

Template.editSurveyorModal.events({
  "submit #edit-surveyor-modal form": function(e, t){
    e.preventDefault();

    var selectedSurveyorId = Session.get("selectedSurveyorId");

    if(selectedSurveyorId){

      var surveyorDoc = {
        _id: selectedSurveyorId,
        firstName: t.find("#edit-surveyor-first-name").value,
        lastName: t.find("#edit-surveyor-last-name").value,
        position: t.find("#edit-surveyor-position").value,
        email: t.find("#edit-surveyor-email").value,
        telephone: t.find("#edit-surveyor-telephone").value
      };

      this.selectedSurveyor.set(surveyorDoc);


      if(this.selectedSurveyor.validateAll()){
        this.selectedSurveyor.save();
        $("#edit-surveyor-modal").modal('hide');
        toastr.success("Surveyor successfully edited!");
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
    return this.firstName + " " + this.lastName;
  }
});

Template.deleteSurveyorModal.events({
  "submit #delete-surveyor-modal form": function(e, t){
    e.preventDefault();

    var selectedSurveyorId = Session.get("selectedSurveyorId");

    if(selectedSurveyorId){
      surveyors.remove({_id: selectedSurveyorId}, function(err){
        if (err) {
          toastr.error(err.reason);
        } else {
          $("#delete-surveyor-modal").modal('hide');
          toastr.success("Surveyor successfully deleted!");
        }
      });

      Session.set("selectedSurveyorId", null);
    }

    // Prevent form reload
    return false;
  }
});
