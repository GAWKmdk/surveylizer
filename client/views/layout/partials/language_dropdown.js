Template.languageDropDown.onCreated(function () {
    if (Session.get("language")) {
        i18n.setLanguage(Session.get("language"));
        moment.locale(Session.get("language"));
    } else {
        Session.set("language", "am");
        i18n.setLanguage("am");
        moment.locale("am");
    }
});

Template.languageDropDown.helpers({
    "activeLanguage": function (language) {
        return Session.equals("language", language) ? "active" : "";
    },
    "hasUnreadNotifications": function () {
        return Notifications.find({receiverId: Meteor.userId(), isRead: false}).count() > 0;
    },
    "totalUnread": function () {
        return Notifications.find({receiverId: Meteor.userId(), isRead: false}).count();
    },
    "unreadNotifications": function () {
        return Notifications.find({receiverId: Meteor.userId(), isRead: false}, {limit: 5, sort: {date_created: -1}});
    }
});

Template.languageDropDown.events({
    "click a.language": function (e, t) {
        Session.set("language", $(e.target).data("language"));
        i18n.setLanguage(Session.get("language"));
        var selectedDate = moment(Session.get("selectedDate"), "MMMM DD, YYYY");
        moment.locale(Session.get("language"));
        Session.set("selectedDate", selectedDate.locale(Session.get("language")).format("MMMM DD, YYYY"));
        $('.date-time-picker').data("DateTimePicker").locale(moment.locale());
    }
});
