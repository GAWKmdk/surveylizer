Template.completedSurveys.created = function () {
    this.pagination = new Meteor.Pagination(Surveys, {
        sort: {
            startDate: -1
        },
        filters: {
            userId: Meteor.userId(),
            status: "finished"
        }
    });
};

Template.completedSurveys.onRendered(function () {
    Session.set("selectedSurveyId", null);
    Session.set("completedSurveySearchAttr", $("table#surveys-completed-list thead td.active").data("search-name"));
});

Template.completedSurveys.onDestroyed(function () {
    Session.set("selectedSurveyId", null);
});

Template.completedSurveys.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    completedSurveysList: function () {
        if (Session.get("completedSurveySearchAttr") && Session.get("completedSurveySearchValue")) {
            var searchFilter = {};
            var searchObject = {
                $regex: Session.get("completedSurveySearchValue"),
                $options: 'i'
            };
            searchFilter[Session.get("completedSurveySearchAttr")] = searchObject;

            var questionnaireIds = getQuestionnaireIds(Questionnaires.find(searchFilter).fetch());

            Template.instance().pagination.filters({
                questionnaireId: {$in: questionnaireIds},
                userId: Meteor.userId(),
                status: "finished"
            });
        } else {
            Template.instance().pagination.filters({
                userId: Meteor.userId(),
                status: "finished"
            });
        }
        return Template.instance().pagination.getPage();
    },
    selectedCompletedSurvey: function () {
        return Session.equals("selectedSurveyId", this._id) ? "active" : "";
    },
    canViewSurvey: function () {
        return Session.get("selectedSurveyId") ? "" : "disabled";
    }
});

Template.completedSurveys.events({
    "click table#surveys-completed-list tr": function (e, t) {
        Session.equals("selectedSurveyId", this._id) ?
            Session.set("selectedSurveyId", null) : Session.set("selectedSurveyId", this._id);
    },
    "click a#view-completed-survey": function (e, t) {
        Router.go('/completed_survey/' + Session.get("selectedSurveyId"));
    },
    "click table#surveys-completed-list thead td": function (e, t) {
        if (!$(e.target).hasClass("disabled")) {
            t.$("table thead td.active").removeClass("active");
            t.$(e.target).addClass("active");

            Session.set("completedSurveySearchAttr", $(e.target).data("search-name"));
        }
    },
    "keyup input#search-surveys-completed": function (e, t) {
        $("#search-surveys-completed-form").trigger("submit");
    },
    "submit #search-surveys-completed-form": function (e, t) {
        e.preventDefault();

        var searchTerm = t.find("#search-surveys-completed").value;
        if (searchTerm) {
            Session.set("completedSurveySearchValue", searchTerm);
        } else {
            Session.set("completedSurveySearchValue", null);
        }

        return false;
    },
    "change #completed-survey-search-field": function (e, t) {
        var selectedOption = t.$(e.target).val();
        Session.set("completedSurveySearchAttr", selectedOption);
    }
});