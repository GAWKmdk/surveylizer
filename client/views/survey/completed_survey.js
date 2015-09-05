Template.completedSurvey.helpers({
    completedSurvey: function(){
        return surveys.findOne({_id: Session.get("currentCompletedSurvey")});
    },
    isTypeOpenEnded: function(){
        return Template.parentData(1).isTypeOpenEnded();
    }
});