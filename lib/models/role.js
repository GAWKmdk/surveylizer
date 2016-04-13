Role = Astro.Class({
    name: 'Role',
    collection: Roles,
    fields: {
        name: 'string',
        permissions: {
            type: 'array',
            default: function(){
                return [];
            }
        }
    },
    validators: {
        name: [
            Validators.required(null, i18n('provideNameMessage')),
            Validators.unique(null, i18n('roleAlreadyRegisteredMessage'))
        ],
        permissions: Validators.array()
    }
});
