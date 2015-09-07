Notification = Astro.Class({
    name: 'Notification',
    collection: notifications,
    fields: {
        receiverId: 'string',
        title: 'string',
        detail: 'string',
        isRead: 'boolean',
        sentOn: {
            type: 'date',
            default: new Date()
        }
    },
    methods: {
        sent: function () {
            return moment(this.sentOn).fromNow();
        },
        summary: function () {
            return this.detail.slice(0, 50) + " ...";
        },
        sendToAdmin: function () {
            var adminRole = roles.findOne({name: "Administrator"});
            var admins = Meteor.users.find({"profile.roleId": adminRole._id}).fetch();
            for (var i = 0; i < admins.length; i++) {
                notifications.insert({
                    receiverId: admins[i]._id,
                    title: this.title,
                    detail: this.detail,
                    isRead: false
                });
            }
        }
    }
});