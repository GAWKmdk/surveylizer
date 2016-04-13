Permission = Astro.Class({
    name: 'Permission',
    collection: Permissions,
    fields: {
        module: 'string',
        operation: 'string'
    },
    validators: {
        module: [
            Validators.required(null, i18n('provideModuleMessage')),
            Validators.unique(null, i18n('moduleAlreadyRegisteredMessage')),
            Validators.string()
        ],
        operation: [
            Validators.required(null, i18n('provideOperationMessage')),
            Validators.string()
        ]
    }
});
