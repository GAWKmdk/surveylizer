QuestionType = Astro.Class({
    name: 'QuestionType',
    collection: QuestionTypes,
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
