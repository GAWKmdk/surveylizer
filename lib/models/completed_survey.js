CompletedSurvey = Astro.Class({
    name: 'CompletedSurvey',
    collection: completedSurveys,
    fields: {
        surveyId: 'string',
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
        surveyId: [
            Validators.required('Please select a Survey'),
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
        survey: function () {
            return surveys.findOne({_id: this.surveyId});
        },
        surveyor: function () {
            return surveyors.findOne({_id: this.surveyorId});
        },
        user: function () {
            return Meteor.users.findOne({_id: this.userId});
        },
        currentQuestion: function () {
            return questions.findOne({surveyId: this.surveyId, orderNumber: this.orderNumber});
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
            completedSurveys.update({_id: this._id}, {$inc: {orderNumber: 1}});
        },
        moveBackward: function () {
            completedSurveys.update({_id: this._id}, {$inc: {orderNumber: -1}});
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