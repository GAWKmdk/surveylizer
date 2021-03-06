Template.summaryReport.onRendered(function () {
    $.material.init();

    this.$('.date-time-picker').datetimepicker({
        format: "DD-MM-YYYY",
        locale: Session.get("language")
    });
});

Template.summaryReport.helpers({
    questionnaires: function(){
        return Questionnaires.find();
    }
});