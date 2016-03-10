Template.deleteSurveyModal.helpers({
    "selectedSurvey": function () {
        return Surveys.findOne({_id: Session.get("selectedSurveyId")});
    }
});

Template.deleteSurveyModal.events({
    "submit #delete-survey-modal form": function (e, t) {
        e.preventDefault();

        var selectedSurveyId = Session.get("selectedSurveyId");

        if (selectedSurveyId) {
            var survey = Surveys.findOne({_id: selectedSurveyId});
            survey.remove();
            Session.set("selectedSurveyId", null);
            $("#delete-survey-modal").modal('hide');
            toastr.success("Survey successfully deleted!");
        }

        // Prevent form reload
        return false;
    }
});