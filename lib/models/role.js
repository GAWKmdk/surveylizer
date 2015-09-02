Role = Astro.Class({
    name: 'Role',
    collection: roles,
    fields: {
        name: 'string',
        permissions: {
            type: 'array',
            default: []
        }
    },
    validators: {
        name: Validators.required(),
        permissions: [
            Validators.array()
        ]
    }
});