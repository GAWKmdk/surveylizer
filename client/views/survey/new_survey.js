Template.newSurvey.onRendered(function(){
    $.material.checkbox();

    $(".datetimepicker").datetimepicker({
        format: 'MM/DD/YYYY'
    });
});