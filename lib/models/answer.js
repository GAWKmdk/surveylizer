Answer = Astro.Class({
    name: 'Answer',
    collection: answers,
    fields: {
        completedSurveyId: 'string',
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
        completedSurveyId: [
            Validators.required('Please select a Survey'),
            Validators.string()
        ],
        questionId: [
            Validators.required('Please select a Question'),
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
            return completedSurveys.findOne({_id: this.completedSurveyId});
        },
        question: function () {
            return questions.findOne({_id: this.questionId});
        }
    }
});