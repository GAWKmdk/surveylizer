Template.languageDropDown.onCreated(function(){
    if(Session.get("language")){
        TAPi18n.setLanguage(Session.get("language"));
    } else {
        Session.set("language", "am");
        TAPi18n.setLanguage("am");
    }
});

Template.languageDropDown.helpers({
    "activeLanguage": function(language){
        return Session.equals("language", language) ? "active" : "";
    },
    "hasUnreadNotifications": function(){
        return Notifications.find({receiverId: Meteor.userId(), isRead: false}).count() > 0;
    },
    "totalUnread": function(){
        return Notifications.find({receiverId: Meteor.userId(), isRead: false}).count();
    },
    "unreadNotifications": function(){
        return Notifications.find({receiverId: Meteor.userId(), isRead: false}, {limit: 5, sort: {date_created: -1}});
    }
});

Template.languageDropDown.events({
    "click a.language": function(e, t){
        Session.set("language", $(e.target).data("language"));
        TAPi18n.setLanguage(Session.get("language"));
    }
});
