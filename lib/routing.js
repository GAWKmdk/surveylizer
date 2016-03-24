Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading"
});

Router.route("/", {
    name: "home",
    action: function () {
        if (this.ready()) {
            // Display Login form is no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("main");
            }
        }
    }
});

//Router.route("/sign_up", {
//    name: "signUp",
//    action: function () {
//        this.layout("layoutAnonymous");
//        if (this.ready()) {
//            // Render signup form if no user is logged in
//            if (!Meteor.userId()) {
//                this.render("signUp");
//            } else {
//                Router.go("/");
//            }
//        }
//    },
//    data: function () {
//        return {
//            user: new User()
//        };
//    }
//});

Router.route("/sign_in", {
    name: "signIn",
    action: function () {
        this.layout("layoutAnonymous");
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                this.render("signIn");
            } else {
                Router.go("/");
            }
        }
    }
});

Router.route("/start_survey", {
    name: "startSurvey",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("startSurvey");
            }
        }
    }
});

Router.route("/continue_survey", {
    name: "continueSurvey",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("continueSurvey");
            }
        }
    }
});

Router.route("/completed_surveys", {
    name: "completedSurveys",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("completedSurveys");
            }
        }
    }
});

Router.route("/completed_survey/:id", {
    name: "completedSurvey",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
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
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
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
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("users");
            }
        }
    },
    data: function () {
        return {
            user: new User(),
            selectedUser: new User()
        };
    }
});

Router.route("/administer/roles_and_permissions", {
    name: "rolesAndPermissionsAdministration",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("rolesAndPermissions");
            }
        }
    },
    data: function () {
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
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("questionnaires");
            }
        }
    },
    data: function () {
        return {
            questionnaire: new Questionnaire(),
            selectedQuestionnaire: new Questionnaire(),
            question: new Question(),
            selectedQuestion: new Question()
        };
    }
});

Router.route("/settings/questions", {
    name: "questions",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("questions");
            }
        }
    },
    data: function () {
        return {
            questionCategory: new QuestionCategory(),
            selectedQuestionCategory: new QuestionCategory()
        };
    }
});

Router.route("/settings/surveyors", {
    name: "surveyors",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("surveyors");
            }
        }
    },
    data: function () {
        return {
            surveyor: new Surveyor(),
            selectedSurveyor: new Surveyor()
        };
    }
});

Router.route("/reports/general", {
    name: "reportsGeneral",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("reportsGeneral");
            }
        }
    }
});

Router.route("/report/general", {
    name: "reportGeneral",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("reportGeneral");
            }
        }
    }
});

Router.route("/report/regional", {
    name: "reportRegional",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("reportRegional");
            }
        }
    }
});

Router.route("/report/summary", {
    name: "reportSummary",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("reportSummary");
            }
        }
    }
});

Router.route("/notifications", {
    name: "notifications",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                this.render("notificationsList");
            }
        }
    }
});

Router.route("/notification/:_id", {
    name: "notification",
    action: function () {
        if (this.ready()) {
            // Render login form if no user is logged in
            if (!Meteor.userId()) {
                Router.go("/sign_in");
            } else {
                Meteor.call("markAsRead", [this.params._id]);
                this.render("viewNotification");
            }
        }
    },
    data: function () {
        return {
            notification: Notifications.findOne({_id: this.params._id})
        };
    }
});
