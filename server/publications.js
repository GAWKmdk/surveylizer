new Meteor.Pagination(Meteor.users);
new Meteor.Pagination(Roles);
new Meteor.Pagination(Permissions);
new Meteor.Pagination(Questionnaires);
new Meteor.Pagination(QuestionTypes);
new Meteor.Pagination(QuestionCategories);
new Meteor.Pagination(Surveyors);
new Meteor.Pagination(Surveys);
new Meteor.Pagination(Questions);
new Meteor.Pagination(Answers);
new Meteor.Pagination(Notifications);

Meteor.publish("completedSurveys", function(){
    return Surveys.find({endDate: {$ne: null}});
});

// Aggregate Publications
Meteor.publish("dailyTotalSurveysStarted", function () {
    ReactiveAggregate(this, Surveys,
        [
            {
                $group: {
                    _id: { month: { $month: "$startDate" }, day: { $dayOfMonth: "$startDate" }, year: { $year: "$startDate" } },
                    customId: {
                        $first: "$_id"
                    },
                    startDate: {
                        $first: "$startDate"
                    },
                    total: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: "$customId",
                    startDate: "$startDate",
                    total: "$total"
                }
            }
        ],
        {clientCollection: 'clientDailyTotalSurveysStarted'});
});

Meteor.publish("dailyTotalSurveysCompleted", function () {
    ReactiveAggregate(this, Surveys,
        [
            {
                $group: {
                    _id: { month: { $month: "$endDate" }, day: { $dayOfMonth: "$endDate" },  year: { $year: "$endDate" } },
                    customId: {
                        $first: "$_id"
                    },
                    endDate: {
                        $first: "$endDate"
                    },
                    total: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: "$customId",
                    endDate: "$endDate",
                    total: "$total"
                }
            }
        ],
        {clientCollection: 'clientDailyTotalSurveysCompleted'});
});

Meteor.publish("dailyTotalAnswers", function () {
    ReactiveAggregate(this, Answers,
        [
            {
                $group: {
                    _id: { month: { $month: "$answeredOn" }, day: { $dayOfMonth: "$answeredOn" }, year: { $year: "$answeredOn" } },
                    customId: {
                        $first: "$_id"
                    },
                    answeredOn: {
                        $first: "$answeredOn"
                    },
                    total: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: "$customId",
                    answeredOn: "$answeredOn",
                    total: "$total"
                }
            }
        ],
        {clientCollection: 'clientDailyTotalAnswers'});
});

Meteor.publish("dailyTotalRespondents", function () {
    ReactiveAggregate(this, Answers,
        [
            {
                $group: {
                    _id: {month: { $month: "$answeredOn" }, day: { $dayOfMonth: "$answeredOn" }, year: { $year: "$answeredOn" }, userId: "$userId" },
                    customId: {
                        $first: "$_id"
                    },
                    userId: {
                        $first: "$userId"
                    },
                    answeredOn: {
                        $first: "$answeredOn"
                    },
                    total: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: "$customId",
                    userId: "$userId",
                    answeredOn: "$answeredOn",
                    total: "$total"
                }
            }
        ],
        {clientCollection: 'clientDailyTotalRespondents'});
});