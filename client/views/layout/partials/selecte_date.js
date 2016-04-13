Template.selectDate.onRendered(function () {
    Session.set("selectedDate", moment().format("MMMM DD, YYYY"));

    this.$('.date-time-picker').datetimepicker({
        format: "DD-MM-YYYY",
        locale: Session.get("language")
    });

    this.$('.date-time-picker input')
        .attr("placeholder", moment(Session.get("selectedDate"), "MMMM DD, YYYY").format("DD-MM-YYYY"));
});

Template.selectDate.events({
    "focus input#select-date": function (e, t) {
        Session.set("selectedDate", moment(e.target.value, "DD-MM-YYYY").format("MMMM DD, YYYY"));
    },
    "blur input#select-date": function (e, t) {
        Session.set("selectedDate", moment(e.target.value, "DD-MM-YYYY").format("MMMM DD, YYYY"));
    }
});