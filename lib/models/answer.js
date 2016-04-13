Answer = Astro.Class({
    name: 'Answer',
    collection: Answers,
    fields: {
        surveyId: 'string',
        userId: 'string',
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
            Validators.required(null, i18n('selectSurveyMessage')),
            Validators.string()
        ],
        userId: [
            Validators.required(null, i18n('provideUserMessage')),
            Validators.string()
        ],
        questionId: [
            Validators.required(null, i18n('selectQuestionMessage')),
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
