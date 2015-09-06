// Start and End of current day
todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);
todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

Template.main.helpers({
    todaysSurveys: function(){
        return surveys.find({startDate: {$gte: todayStart, $lt: todayEnd}}).count();
    },
    todaysCompletedSurveyors: function(){
        return surveys.find({endDate: {$gte: todayStart, $lt: todayEnd}}).count();
    },
    todaysAnswers: function(){
        return answers.find({answeredOn: {$gte: todayStart, $lt: todayEnd}}).count();
    },
    todaysReports: function(){

    }
});
