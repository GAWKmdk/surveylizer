QuestionCategory = Astro.Class({
    name: 'QuestionCategory',
    collection: QuestionCategories,
    fields: {
        name: 'string'
    },
    validators: {
        name: [
            Validators.required(null, i18n('provideNameMessage')),
            Validators.unique(null, i18n('categoryAlreadyRegisteredMessage')),
            Validators.string()
        ]
    }
});
