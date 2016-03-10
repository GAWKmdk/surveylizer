Answer = Astro.Class({
    name: 'Answer',
    collection: Answers,
    fields: {
        surveyId: 'string',
        questionId: 'string',
        value: 'string',
        choiceOrderNumber: {
            type: 'number',
            default: 0
        },
        answeredOn: {
            type: 'date',
            default: function(){
                return new Date();
            }
        }
    },
    validators: {
        surveyId: [
            Validators.required(null, 'Please select a Survey'),
            Validators.string()
        ],
        questionId: [
            Validators.required(null, 'Please select a Question'),
            Validators.string()
        ],
        value: [
            Validators.string()
        ],
        choiceOrderNumber: [
            Validators.number()
        ],
        answeredOn: [
            Validators.required(),
            Validators.date()
        ]
    },
    methods: {
        completedSurvey: function () {
            return Surveys.findOne({_id: this.surveyId});
        },
        question: function () {
            return Questions.findOne({_id: this.questionId});
        }
    }
});
