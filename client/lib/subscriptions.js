Meteor.subscribe("users");
Meteor.subscribe("roles");
Meteor.subscribe("permissions");
Meteor.subscribe("questionnaires");
Meteor.subscribe("questionTypes");
Meteor.subscribe("questionCategories");
Meteor.subscribe("surveyors");
Meteor.subscribe("questions");
Meteor.subscribe("surveys");
Meteor.subscribe("completedSurveys");
Meteor.subscribe("answers");
Meteor.subscribe("notifications");


// Aggregate Publication Collections
clientDailyTotalSurveysStarted = new Meteor.Collection("clientDailyTotalSurveysStarted");
clientDailyTotalSurveysCompleted = new Meteor.Collection("clientDailyTotalSurveysCompleted");
clientDailyTotalAnswers = new Meteor.Collection("clientDailyTotalAnswers");
clientDailyTotalRespondents = new Meteor.Collection("clientDailyTotalRespondents");

// Aggregate Publications Subscriptions
Meteor.subscribe("dailyTotalSurveysStarted");
Meteor.subscribe("dailyTotalSurveysCompleted");
Meteor.subscribe("dailyTotalAnswers");
Meteor.subscribe("dailyTotalRespondents");