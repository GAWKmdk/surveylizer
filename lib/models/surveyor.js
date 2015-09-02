Surveyor = Astro.Class({
    name: 'Surveyor',
    collection: surveyors,
    fields: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        telephone: 'string',
        position: 'string',
        createdAt: {
            type: 'date',
            default: new Date()
        }
    },
    validators: {
        firstName: [
            Validators.required(),
            Validators.string()
        ],
        lastName: [
            Validators.required(),
            Validators.string()
        ],
        email: [
            Validators.required(),
            Validators.email()
        ],
        telephone: [
            Validators.required(),
            Validators.string()
        ],
        position: Validators.string(),
        createdAt: [
            Validators.required(),
            Validators.date()
        ]
    },
    methods: {
        fullName: function () {
            return this.firstName + " " + this.lastName;
        }
    }
});