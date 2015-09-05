Questionnaire = Astro.Class({
    name: 'Questionnaire',
    collection: questionnaires,
    fields: {
        name: 'string',
        code: 'string',
        description: 'string',
        createdAt: {
            type: 'date',
            default: new Date()
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
    methods: {
        questions: function () {
            return questions.find({questionnaireId: this._id});
        }
    }
});
