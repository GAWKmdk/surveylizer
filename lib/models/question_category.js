QuestionCategory = Astro.Class({
    name: 'QuestionCategory',
    collection: questionCategories,
    fields: {
        name: 'string'
    },
    validators: {
        name: [
            Validators.required(null, "Please provide the category name"),
            Validators.unique(null, "The category has already been registered"),
            Validators.string()
        ]
    }
});