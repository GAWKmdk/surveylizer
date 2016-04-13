// Start and End of current day
todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);
todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

Template.main.helpers({
    dailyTotalSurveysStarted: function(){
        var dailyTotal = clientDailyTotalSurveysStarted.findOne({
            startDate: {
                $gte: moment(Session.get("selectedDate"), "MMMM DD, YYYY").startOf("day").toDate(),
                $lt: moment(Session.get("selectedDate"), "MMMM DD, YYYY").endOf("day").toDate()
            }
        });
        return dailyTotal ? dailyTotal.total : 0;
    },
    dailyTotalSurveysCompleted: function(){
        var dailyTotal = clientDailyTotalSurveysCompleted.findOne({
            endDate: {
                $gte: moment(Session.get("selectedDate"), "MMMM DD, YYYY").startOf("day").toDate(),
                $lt: moment(Session.get("selectedDate"), "MMMM DD, YYYY").endOf("day").toDate()
            }
        });
        return dailyTotal ? dailyTotal.total : 0;
    },
    dailyTotalAnswers: function(){
        var dailyTotal = clientDailyTotalAnswers.findOne({
            answeredOn: {
                $gte: moment(Session.get("selectedDate"), "MMMM DD, YYYY").startOf("day").toDate(),
                $lt: moment(Session.get("selectedDate"), "MMMM DD, YYYY").endOf("day").toDate()
            }
        });
        return dailyTotal ? dailyTotal.total : 0;
    },
    dailyTotalRespondents: function(){
        var dailyTotal = clientDailyTotalRespondents.find({
            answeredOn: {
                $gte: moment(Session.get("selectedDate"), "MMMM DD, YYYY").startOf("day").toDate(),
                $lt: moment(Session.get("selectedDate"), "MMMM DD, YYYY").endOf("day").toDate()
            }
        }).count();
        return dailyTotal;
    }
});
