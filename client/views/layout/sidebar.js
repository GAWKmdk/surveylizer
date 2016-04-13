Template.sidebar.onRendered(function(){
    $("#sidebar-content").slimScroll({
        height: '100%'
    });
});

toggleOpenIcon = function(icon){
    if(icon.hasClass("fa-rotate-90")){
        icon.removeClass("fa-rotate-90");
    } else {
        icon.addClass("fa-rotate-90");
    }
};

Template.sidebar.helpers({
    currentUser: function(){
        return Meteor.user();
    },
    fullName: function(){
        return this.profile.firstName + " " + this.profile.lastName;
    },
    accountType: function(){
        var role = this.role() ? this.role().name : "";
        return i18n("roles." + camelize(role));
    }
});

Template.sidebar.events({
    'click #navigation a.main-menu-item': function(e, t){
        $(e.target).next("ul").slideToggle();
        toggleOpenIcon($(e.target).children("i.pull-right"));
    },
    'click #navigation a.main-menu-item>*': function(e, t){
        $(e.target).parent().next("ul").slideToggle();
        toggleOpenIcon($(e.target).parent().children("i.pull-right"));
    }
});