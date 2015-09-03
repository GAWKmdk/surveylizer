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
        name: [
            Validators.required(null, "Please provide a name for the Role"),
            Validators.unique(null, "This role has already been added")
        ],
        permissions: Validators.array()
    }
});