Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading"
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
    },
    data: function() {
        return {
            user: new User()
        };
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

Router.route("/start_survey", {
    name: "startSurvey",
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
                this.render("startSurvey");
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

Router.route("/completed_surveys", {
    name: "completedSurveys",
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
                this.render("completedSurveys");
            }
        }
    }
});

Router.route("/completed_survey/:id", {
    name: "completedSurvey",
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
                Session.set("currentCompletedSurvey", this.params.id);
                this.render("completedSurvey");
            }
        }
    }
});

Router.route("/complete_survey/:id", {
    name: "completeSurvey",
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
                Session.set("surveyToCompleteId", this.params.id);
                this.render("completeSurvey");
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
    },
    data: function() {
        return {
            user: new User(),
            selectedUser: new User()
        };
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
    },
    data: function() {
        return {
            role: new Role(),
            selectedRole: new Role(),
            permission: new Permission(),
            selectedPermission: new Permission()
        };
    }
});

Router.route("/settings/questionnaires", {
    name: "questionnaires",
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
                this.render("questionnaires");
            }
        }
    },
    data: function() {
        return {
            questionnaire: new Questionnaire(),
            selectedQuestionnaire: new Questionnaire()
        };
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
    },
    data: function() {
        return {
            questionCategory: new QuestionCategory(),
            selectedQuestionCategory: new QuestionCategory()
        };
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
    },
    data: function() {
        return {
            surveyor: new Surveyor(),
            selectedSurveyor: new Surveyor()
        };
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