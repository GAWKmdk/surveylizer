QuestionCategory = Astro.Class({
    name: 'QuestionCategory',
    collection: questionCategories,
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