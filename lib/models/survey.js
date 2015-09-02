Survey = Astro.Class({
    name: 'Survey',
    collection: surveys,
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
            Validators.required(),
            Validators.string()
        ],
        code: [
            Validators.required(),
            Validators.string()
        ],
        description: [
            Validators.required(),
            Validators.string()
        ],
        createdAt: [
            Validators.required(),
            Validators.date()
        ]
    },
    methods: {
        questions: function () {
            return questions.find({surveyId: this._id});
        }
    }
});
