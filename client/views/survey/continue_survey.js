getQuestionnaireIds = function (questionnaireList) {
    var questionnaireIds = [];
    _.each(questionnaireList, function (questionnaire) {
        questionnaireIds.push(questionnaire._id);
    });
    return questionnaireIds;
};

Template.continueSurvey.created = function () {
    this.pagination = new Meteor.Pagination(Surveys, {
        sort: {
            code: 1
        },
        filters: {
            userId: Meteor.userId(),
            status: "started"
        }
    });
};

Template.continueSurvey.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    continueSurveyList: function () {
        if (Session.get("continueSurveySearchAttr") && Session.get("continueSurveySearchValue")) {
            var searchFilter = {};
            var searchObject = {
                $regex: Session.get("continueSurveySearchValue"),
                $options: 'i'
            };
            searchFilter[Session.get("continueSurveySearchAttr")] = searchObject;

            var questionnaireIds = getQuestionnaireIds(Questionnaires.find(searchFilter).fetch());

            Template.instance().pagination.filters({
                questionnaireId: {$in: questionnaireIds},
                userId: Meteor.userId(),
                status: "started"
            });
        } else {
            Template.instance().pagination.filters({
                userId: Meteor.userId(),
                status: "started"
            });
        }
        return Template.instance().pagination.getPage();
    },
    selectedContinueSurvey: function () {
        return Session.equals("selectedSurveyId", this._id) ? "active" : "";
    },
    canContinueSurvey: function () {
        return Session.get("selectedSurveyId") ? "" : "disabled";
    }
});

Template.continueSurvey.events({
    "click table#surveys-to-continue-list tr": function (e, t) {
        Session.equals("selectedSurveyId", this._id) ?
            Session.set("selectedSurveyId", null) : Session.set("selectedSurveyId", this._id);
    },
    "click a#continue-completed-survey": function (e, t) {
        Router.go('/complete_survey/' + Session.get("selectedSurveyId"));
    },
    "click table#surveys-to-continue-list thead td": function (e, t) {
        if (!$(e.target).hasClass("disabled")) {
            t.$("table thead td.active").removeClass("active");
            t.$(e.target).addClass("active");

            Session.set("continueSurveySearchAttr", $(e.target).data("search-name"));
        }
    },
    "keyup input#search-surveys-to-continue": function (e, t) {
        $("#search-surveys-to-continue-form").trigger("submit");
    },
    "submit #search-surveys-to-continue-form": function (e, t) {
        e.preventDefault();

        var searchTerm = t.find("#search-surveys-to-continue").value;
        if (searchTerm) {
            Session.set("continueSurveySearchValue", searchTerm);
        } else {
            Session.set("continueSurveySearchValue", null);
        }

        return false;
    }
});

Template.continueSurvey.onRendered(function () {
    Session.set("selectedSurveyId", null);
    Session.set("continueSurveySearchAttr", $("table#surveys-to-continue-list thead td.active").data("search-name"));
});

Template.continueSurvey.onDestroyed(function () {
    Session.set("selectedSurveyId", null);
});

Template.viewSurveyModal.helpers({
    selectedSurvey: function () {
        return Surveys.findOne({_id: Session.get("selectedSurveyId")});
    },
    isTypeOpenEnded: function () {
        return Template.parentData(1).isTypeOpenEnded();
    }
});
