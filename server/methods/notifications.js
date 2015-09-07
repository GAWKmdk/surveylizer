Meteor.methods({
    "markAsRead": function (notificationIds) {
        notifications.update({_id: {$in: notificationIds}}, {$set: {isRead: true}}, {multi: true});
    },
    "markAsUnread": function(notificationIds) {
        notifications.update({_id: {$in: notificationIds}}, {$set: {isRead: false}}, {multi: true});
    },
    "deleteNotifications": function(notificationIds){
        notifications.remove({_id: {$in: notificationIds}});
    }
});