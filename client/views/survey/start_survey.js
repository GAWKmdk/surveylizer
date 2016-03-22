Template.startSurvey.onRendered(function () {
    Session.set("questionnaireToStartId", null);
    Session.set("surveyStarted", null);
    Session.set("startSurveySearchAttr", $("table#surveys-to-start-list thead td.active").data("search-name"));
});

Template.startSurvey.onDestroyed(function () {
    Session.set("questionnaireToStartId", null);
    Session.set("surveyStarted", null);
});

Template.startSurvey.created = function () {
    this.pagination = new Meteor.Pagination(Questionnaires, {
        sort: {
            code: 1
        }
    });
};

Template.startSurvey.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    questionnaires: function () {
        if (Session.get("startSurveySearchAttr") && Session.get("startSurveySearchValue")) {
            var searchFilter = {};
            var searchObject = {
                $regex: Session.get("startSurveySearchValue"),
                $options: 'i'
            };
            searchFilter[Session.get("startSurveySearchAttr")] = searchObject;
            Template.instance().pagination.filters(searchFilter);
        } else {
            Template.instance().pagination.filters({});
        }
        return Template.instance().pagination.getPage();
    },
    numberOfQuestions: function () {
        return Questions.find({questionnaireId: this._id}).count();
    },
    isSelected: function () {
        return Session.get("questionnaireToStartId") == this._id ? "active" : "";
    },
    canStartSurvey: function () {
        return Session.get("questionnaireToStartId") ? "" : "disabled";
    },
    surveyStarted: function () {
        return Session.get("surveyStarted");
    }
});

Template.startSurvey.events({
    "click table#surveys-to-start-list tr": function (e, t) {
        if (Session.equals("questionnaireToStartId", this._id)) {
            Session.set("questionnaireToStartId", false);
        } else {
            Session.set("questionnaireToStartId", this._id);
        }
    },
    "click table#surveys-to-start-list thead td": function (e, t) {
        if (!$(e.target).hasClass("disabled")) {
            t.$("table thead td.active").removeClass("active");
            t.$(e.target).addClass("active");

            Session.set("startSurveySearchAttr", $(e.target).data("search-name"));
        }
    },
    "keyup input#search-surveys-to-start": function (e, t) {
        $("#search-surveys-to-start-form").trigger("submit");
    },
    "submit #search-surveys-to-start-form": function (e, t) {
        e.preventDefault();

        var searchTerm = t.find("#search-surveys-to-start").value;
        if (searchTerm) {
            Session.set("startSurveySearchValue", searchTerm);
        } else {
            Session.set("startSurveySearchValue", null);
        }

        return false;
    },
    "change #start-survey-search-field": function (e, t) {
        var selectedOption = t.$(e.target).val();
        Session.set("startSurveySearchAttr", selectedOption);
    }
});

Template.startSurveyModal.helpers({
    geoLocation: function () {
        return Geolocation.latLng();
    }
});

Template.startSurveyModal.events({
    "submit form": function (e, t) {
        e.preventDefault();

        var currentQuestionnaireId = Session.get("questionnaireToStartId");
        var currentUserId = Meteor.userId();

        if (currentQuestionnaireId && currentUserId) {
            var currentSurveyId = Surveys.insert({
                questionnaireId: currentQuestionnaireId,
                userId: currentUserId,
                startDate: new Date(),
                location: {
                    address: t.find("#survey-address").value,
                    latitude: t.find("#survey-geo-latitude").value,
                    longitude: t.find("#survey-geo-longitude").value
                },
                endDate: null,
                status: Meteor.settings.public.surveyStatusStarted,
                orderNumber: 1
            }, function (err) {
                if (err) {
                    new Error.throw(err);
                }
            });
            Session.set("currentSurveyId", currentSurveyId);
        }
        $("#start-survey-modal").modal("hide");
        Notify.user("New Survey Started", "A new survey has been started", Meteor.userId());

        Router.go('/complete_survey/' + Session.get("currentSurveyId"));
    }
});

Template.startSurveyModal.onRendered(function () {
    $.material.init();
});

