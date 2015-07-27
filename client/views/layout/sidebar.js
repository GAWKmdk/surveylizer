Template.sidebar.onRendered(function(){
    $("#sidebar-content").slimScroll({
        height: '100%'
    });
});

Template.sidebar.helpers({
    currentUser: function(){
        return Meteor.user();
    },
    fullName: function(){
        return this.profile.firstName + " " + this.profile.lastName;
    },
    accountType: function(){
        return this.profile.acctType;
    }
});

Template.sidebar.events({
    'click #navigation a.main-menu-item': function(e, t){
        $(e.target).next("ul").slideToggle();
    },
    'click #navigation a.main-menu-item>*': function(e, t){
        $(e.target).parent().next("ul").slideToggle();
    }
});