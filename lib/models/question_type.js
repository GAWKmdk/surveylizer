QuestionType = Astro.Class({
    name: 'QuestionType',
    collection: questionTypes,
    fields: {
        name: 'string'
    },
    validators: {
        name: [
            Validators.required(),
            Validators.string()
        ]
    }
});