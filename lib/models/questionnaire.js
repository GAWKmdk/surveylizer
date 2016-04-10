Questionnaire = Astro.Class({
    name: 'Questionnaire',
    collection: Questionnaires,
    fields: {
        name: 'string',
        code: 'string',
        description: 'string',
        createdAt: {
            type: 'date',
            default: function(){
                return new Date();
            }
        }
    },
    validators: {
        name: [
            Validators.required(null, "Please provide the name for the Questionnaire"),
            Validators.string()
        ],
        code: [
            Validators.required(null, "Please provide the code for the Questionnaire"),
            Validators.string()
        ],
        description: [
            Validators.required(null, "Please provide the description for the Questionnaire"),
            Validators.string()
        ],
        createdAt: [
            Validators.required(),
            Validators.date()
        ]
    },
    events: {
        beforeremove: function(){
            var questionnaireId = this._id;
            // Remove related Questions
            var relatedQuestions = Questions.find({questionnaireId: questionnaireId}).fetch();
            _.each(relatedQuestions, function(question){
               question.remove();
            });
            // Remove related Surveys
            var relatedSurveys = Surveys.find({questionnaireId: questionnaireId}).fetch();
            _.each(relatedSurveys, function(survey){
               survey.remove();
            });
        }
    },
    methods: {
        questions: function () {
            return Questions.find({questionnaireId: this._id}, {sort: {orderNumber: 1}});
        }
    }
});
