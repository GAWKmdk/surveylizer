Answer = Astro.Class({
    name: 'Answer',
    collection: answers,
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
            default: new Date()
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
            return surveys.findOne({_id: this.surveyId});
        },
        question: function () {
            return questions.findOne({_id: this.questionId});
        }
    }
});