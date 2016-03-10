Template.surveyors.created = function () {
    this.pagination = new Meteor.Pagination(Surveyors, {
        sort: {
            firstName: 1
        }
    });
};

Template.surveyors.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    surveyors: function () {
        return Template.instance().pagination.getPage();
    },
    selectedSurveyor: function () {
        return Session.equals("selectedSurveyorId", this._id) ? "active" : "";
    },
    canEditSurveyor: function () {
        return Session.get("selectedSurveyorId") ? "" : "disabled";
    },
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
});

Template.surveyors.events({
    "click table#surveyors-list tr": function (e, t) {
        Session.equals("selectedSurveyorId", this._id) ?
            Session.set("selectedSurveyorId", null) : Session.set("selectedSurveyorId", this._id);
    },
    "submit #new-surveyor-form": function (e, t) {
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

        if (this.surveyor.validate()) {
            newSurveyor.save();
            t.find("form").reset();
            toastr.success("Surveyor successfully created!");
        }

        // Prevent form reload
        return false;
    },
    "click button.btn-clear": function (e, t) {
        t.find("#new-surveyor-form").reset();
    }
});

Template.editSurveyorModal.helpers({
    "selectedSurveyor": function () {
        this.selectedSurveyor = Surveyors.findOne({_id: Session.get("selectedSurveyorId")});
        return this.selectedSurveyor;
    }
});

Template.editSurveyorModal.events({
    "submit #edit-surveyor-modal form": function (e, t) {
        e.preventDefault();

        var selectedSurveyorId = Session.get("selectedSurveyorId");

        if (selectedSurveyorId) {

            var surveyorDoc = {
                _id: selectedSurveyorId,
                firstName: t.find("#edit-surveyor-first-name").value,
                lastName: t.find("#edit-surveyor-last-name").value,
                position: t.find("#edit-surveyor-position").value,
                email: t.find("#edit-surveyor-email").value,
                telephone: t.find("#edit-surveyor-telephone").value
            };

            this.selectedSurveyor.set(surveyorDoc);


            if (this.selectedSurveyor.validate()) {
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
    "selectedSurveyor": function () {
        return Surveyors.findOne({_id: Session.get("selectedSurveyorId")});
    },
    "fullName": function () {
        return this.firstName + " " + this.lastName;
    }
});

Template.deleteSurveyorModal.events({
    "submit #delete-surveyor-modal form": function (e, t) {
        e.preventDefault();

        var selectedSurveyorId = Session.get("selectedSurveyorId");

        if (selectedSurveyorId) {
            Surveyors.remove({_id: selectedSurveyorId}, function (err) {
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
