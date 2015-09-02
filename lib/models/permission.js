Permission = Astro.Class({
    name: 'Permission',
    collection: permissions,
    fields: {
        module: 'string',
        operation: 'string'
    },
    validators: {
        module: [
            Validators.required(),
            Validators.string()
        ],
        operation: [
            Validators.required(),
            Validators.string()
        ]
    }
});