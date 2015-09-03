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
            Validators.required(null, "Please provide the surveyor's First Name"),
            Validators.string()
        ],
        lastName: [
            Validators.required(null, "Please provide the surveyor's Last Name"),
            Validators.string()
        ],
        email: [
            Validators.required(null, "Please provide the surveyor's Email"),
            Validators.email(),
            Validators.unique()
        ],
        telephone: [
            Validators.required(null, "Please provide the surveyor's Telephone"),
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