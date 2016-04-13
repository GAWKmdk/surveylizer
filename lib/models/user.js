User = Astro.Class({
    name: 'User',
    collection: Meteor.users,
    fields: {
        username: 'string',
        password: 'string',
        profile: 'object',
        services: 'object',
        createdAt: {
            type: 'date',
            default: function() {
                return new Date();
            }
        }
    },
    validators: {
        username: [
            Validators.required(null, i18n('provideUsernameMessage')),
            Validators.string(),
            Validators.minLength(5, i18n('usernameShortMessage'))
        ],
        password: [
            Validators.required(null, i18n('providePasswordMessage')),
            Validators.string(),
            Validators.minLength(8, i18n('passwordShortMessage')),
            Validators.maxLength(14, i18n('passwordLongMessage')),
            Validators.regexp(/^(?=.*[0-9])/, i18n('passwordNumberMessage')),
            // Validators.regexp(/^(?=.*[A-Z])/, i18n('passwordUppercaseMessage')),
            // Validators.regexp(/^(?=.*[a-z])/, i18n('passwordLowercaseMessage')),
            Validators.regexp(/^(?=.*[$@#?!%*&^|])/, i18n('passwordSpecialCharacterMessage'))
        ],
        profile: Validators.required(),
        "profile.roleId": [
            Validators.required(null, i18n('selectRoleMessage')),
            Validators.string()
        ],
        "profile.firstName": [
            Validators.required(null, i18n('provideFirstNameMessage')),
            Validators.string()
        ],
        "profile.lastName": [
            Validators.required(null, i18n('provideLastNameMessage')),
            Validators.string()
        ],
        "profile.address": [
            Validators.string()
        ],
        "profile.city": [
            Validators.string()
        ],
        "profile.state": [
            Validators.string()
        ],
        "profile.postalCode": [
            Validators.string()
        ],
        createdAt: [
            Validators.required(),
            Validators.date()
        ]
    },
    methods: {
        fullName: function () {
            return this.profile.firstName + " " + this.profile.lastName;
        },
        role: function() {
          return Roles.findOne({_id: this.profile.roleId});
        }
    }
});
