Template.selectDate.onRendered(function () {
    Session.set("selectedDate", moment().format("DD-MM-YYYY"));

    this.$('.date-time-picker').datetimepicker({
        format: "DD-MM-YYYY"
    });

    this.$('.date-time-picker input')
        .attr("placeholder", moment(Session.get("selectedDate"), "DD-MM-YYYY").format("DD-MM-YYYY"));
});

Template.selectDate.events({
    "focus input#select-date": function (e, t) {
        Session.set("selectedDate", e.target.value);
    },
    "blur input#select-date": function (e, t) {
        Session.set("selectedDate", e.target.value);
    }
});