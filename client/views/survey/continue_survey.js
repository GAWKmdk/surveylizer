Template.continueSurvey.onRendered(function(){
    $.material.checkbox();

    $(".datetimepicker").datetimepicker({
        format: 'MM/DD/YYYY'
    });
});

Template.continueSurvey.onRendered(function(){
    $.material.radio();
});