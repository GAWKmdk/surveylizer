Template.notificationsDropDown.helpers({
    "hasUnreadNotifications": function(){
        return notifications.find({receiverId: Meteor.userId(), isRead: false}).count() > 0;
    },
    "totalUnread": function(){
        return notifications.find({receiverId: Meteor.userId(), isRead: false}).count();
    },
    "unreadNotifications": function(){
        return notifications.find({receiverId: Meteor.userId(), isRead: false}, {limit: 5, sort: {date_created: -1}});
    }
});
