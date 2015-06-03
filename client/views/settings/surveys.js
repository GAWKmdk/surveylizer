Template.surveys.helpers({
    surveys: function(){
        return surveys.find();
    }
});

Template.surveys.events({
    "submit #new-survey-form": function(e, t){
        e.preventDefault();

        // Get permission name
        var name = t.find("#new-survey-name").value,
            code = t.find("#new-survey-code").value,
            description = t.find("#new-survey-description").value;

        if(name && code && description){
            surveys.insert({
                name: name,
                code: code,
                description: description
            });
        }

        // Prevent form reload
        return false;
    }
});