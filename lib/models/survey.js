Survey = Astro.Class({
    name: 'Survey',
    collection: surveys,
    fields: {
        questionnaireId: 'string',
        surveyorId: 'string',
        userId: 'string',
        status: {
            type: 'string',
            default: 'started'
        },
        orderNumber: {
            type: 'number',
            default: 1
        },
        startDate: {
            type: 'date',
            default: new Date()
        },
        endDate: {
            type: 'date',
            default: null
        }
    },
    validators: {
        questionnaireId: [
            Validators.required('Please select a Questionnaire'),
            Validators.string()
        ],
        surveyorId: [
            Validators.required('Please select a Surveyor'),
            Validators.string()
        ],
        userId: [
            Validators.required(),
            Validators.string()
        ],
        status: [
            Validators.required(),
            Validators.string()
        ],
        orderNumber: [
            Validators.required(),
            Validators.number()
        ],
        startDate: [
            Validators.required(),
            Validators.date()
        ]
    },
    methods: {
        questionnaire: function () {
            return questionnaires.findOne({_id: this.questionnaireId});
        },
        surveyor: function () {
            return surveyors.findOne({_id: this.surveyorId});
        },
        user: function () {
            return Meteor.users.findOne({_id: this.userId});
        },
        currentQuestion: function () {
            return questions.findOne({questionnaireId: this.questionnaireId, orderNumber: this.orderNumber});
        },
        totalNumberOfQuesitons: function () {
            return questions.find({surveyId: this.surveyId}).count();
        },
        canNavigateForward: function () {
            return this.orderNumber < this.totalNumberOfQuesitons() ? true : false;
        },
        canNavigateBackward: function () {
            return this.orderNumber > 1;
        },
        moveForward: function () {
            surveys.update({_id: this._id}, {$inc: {orderNumber: 1}});
        },
        moveBackward: function () {
            surveys.update({_id: this._id}, {$inc: {orderNumber: -1}});
        },
        timeStarted: function () {
            return moment(this.startDate).fromNow();
        },
        startDateDisplay: function () {
            return moment(this.startDate).format("DD-MM-YYYY hh:mm A");
        },
        endDateDisplay: function () {
            return moment(this.startDate).format("DD-MM-YYYY hh:mm A");
        }
    }
});