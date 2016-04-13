Surveyor = Astro.Class({
    name: 'Surveyor',
    collection: Surveyors,
    fields: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        telephone: 'string',
        position: 'string',
        createdAt: {
            type: 'date',
            default: function(){
                return new Date();
            }
        }
    },
    validators: {
        firstName: [
            Validators.required(null, i18n('provideFirstNameMessage')),
            Validators.string()
        ],
        lastName: [
            Validators.required(null, i18n('provideLastNameMessage')),
            Validators.string()
        ],
        email: [
            Validators.required(null, i18n('provideEmailMessage')),
            Validators.email(),
            Validators.unique()
        ],
        telephone: [
            Validators.required(null, i18n('provideTelephoneMessage')),
            Validators.string()
        ],
        position: Validators.string()
    },
    methods: {
        fullName: function () {
            return this.firstName + " " + this.lastName;
        }
    }
});
