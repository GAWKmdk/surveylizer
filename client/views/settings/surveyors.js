Template.surveyors.onCreated(function () {
    this.pagination = new Meteor.Pagination(Surveyors, {
        sort: {
            firstName: 1
        }
    });
});

Template.surveyors.onRendered(function () {
    Session.set("surveyorSearchAttr", $("table thead td.active").data("search-name"));
});

Template.surveyors.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    surveyors: function () {
        if (Session.get("surveyorSearchAttr") && Session.get("surveyorSearchValue")) {
            var searchFilter = {};
            var searchObject;

            if(Session.get("surveyorSearchAttr") == "fullName"){
                searchFilter = {
                    $or: [
                        {firstName: {$regex: Session.get("surveyorSearchValue"), $options: 'i'}},
                        {lastName: {$regex: Session.get("surveyorSearchValue"), $options: 'i'}}
                    ]
                };
            }else{
                searchObject = {
                    $regex: Session.get("surveyorSearchValue"), $options: 'i'
                };
                searchFilter[Session.get("surveyorSearchAttr")] = searchObject;
            }

            Template.instance().pagination.filters(searchFilter);
        } else {
            Template.instance().pagination.filters({});
        }
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
    },
    "click table#surveyors-list thead td": function (e, t) {
        if(!$(e.target).hasClass("disabled")){
            t.$("table thead td.active").removeClass("active");
            t.$(e.target).addClass("active");

            Session.set("surveyorSearchAttr", $(e.target).data("search-name"));
        }
    },
    "keyup input#search-surveyors": function (e, t) {
        $("#search-surveyors-form").trigger("submit");
    },
    "submit #search-surveyors-form": function(e, t){
        e.preventDefault();

        var searchTerm = t.find("#search-surveyors").value;
        if(searchTerm){
            Session.set("surveyorSearchValue", searchTerm);
        } else {
            Session.set("surveyorSearchValue", null);
        }
        return false;
    },
    "change #surveyor-search-field": function(e, t){
        var selectedOption = t.$(e.target).val();
        Session.set("surveyorSearchAttr", selectedOption);
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

            this.selectedSurveyor = Surveyors.findOne({_id: selectedSurveyorId});
            this.selectedSurveyor.set(surveyorDoc);

            if (this.selectedSurveyor.validate()) {
                Meteor.call("updateSurveyor", this.selectedSurveyor, function(err){
                    if (err) {
                        toastr.error(err.reason);
                    } else {
                        $("#edit-surveyor-modal").modal('hide');
                        toastr.success("Surveyor successfully updated!");
                    }
                });
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
            this.selectedSurveyor = Surveyors.findOne({_id: selectedSurveyorId});

            Meteor.call("deleteSurveyor", this.selectedSurveyor, function(err){
                if (err) {
                    toastr.error(err.reason);
                } else {
                    Session.set("selectedSurveyorId", null);
                    $("#delete-surveyor-modal").modal('hide');
                    toastr.success("Surveyor successfully deleted!");
                }
            });
        }

        // Prevent form reload
        return false;
    }
});
