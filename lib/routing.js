Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: 'loading'
});

Router.route("/", {
    name: "home",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Display Login form is no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("main");
            }
        }
    }
});

Router.route("/sign_up", {
    name: "signUp",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        this.layout("layoutAnonymous");
        if (this.ready()) {
            // Render signup form if no user is logged in
            if(!Meteor.userId()){
                this.render("signUp");
            } else {
                Router.go("/");
            }
        }
    }
});

Router.route("/sign_in", {
    name: "signIn",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        this.layout("layoutAnonymous");
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                this.render("signIn");
            } else {
                Router.go("/");
            }
        }
    }
});

Router.route("/new_survey", {
    name: "newSurvey",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("newSurvey");
            }
        }
    }
});

Router.route("/continue_survey", {
    name: "continueSurvey",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("continueSurvey");
            }
        }
    }
});

Router.route("/administer/users", {
    name: "userAdministration",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("users");
            }
        }
    }
});

Router.route("/administer/roles_and_permissions", {
    name: "rolesAndPermissionsAdministration",
    //waitOn: function() {
    //    // wait till user data is available
    //    return Meteor.subscribe("roles");
    //},
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("rolesAndPermissions");
            }
        }
    }
});

Router.route("/settings/surveys", {
    name: "surveys",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("surveys");
            }
        }
    }
});

Router.route("/settings/questions", {
    name: "questions",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("questions");
            }
        }
    }
});

Router.route("/settings/surveyors", {
    name: "surveyors",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("surveyors");
            }
        }
    }
});

Router.route("/reports/general", {
    name: "reportsGeneral",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("reportsGeneral");
            }
        }
    }
});

Router.route("/report/general", {
    name: "reportGeneral",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("reportGeneral");
            }
        }
    }
});

Router.route("/report/regional", {
    name: "reportRegional",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("reportRegional");
            }
        }
    }
});

Router.route("/report/summary", {
    name: "reportSummary",
    // waitOn: function() {
    //   // wait till user data is available
    //   return Meteor.subscribe("userData");
    // },
    action: function() {
        if (this.ready()) {
            // Render login form if no user is logged in
            if(!Meteor.userId()){
                Router.go("/sign_in");
            } else {
                this.render("reportSummary");
            }
        }
    }
});