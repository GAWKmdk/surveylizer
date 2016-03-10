Survey = Astro.Class({
    name: 'Survey',
    collection: Surveys,
    fields: {
        questionnaireId: 'string',
        surveyorId: 'string',
        userId: 'string',
        location: 'object',
        "location.address": 'string',
        "location.latitude": 'number',
        "location.longitude": 'number',
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
            default: function(){
                return new Date();
            }
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
        location: [
            Validators.object()
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
    events: {
        beforeremove: function(){
            var surveyId = this._id;
            // Remove related Answers
            var relatedAnswers = Answers.find({surveyId: surveyId}).fetch();
            _.each(relatedAnswers, function(answer){
                answer.remove();
            });
        }
    },
    methods: {
        questionnaire: function () {
            return Questionnaires.findOne({_id: this.questionnaireId});
        },
        surveyor: function () {
            return Surveyors.findOne({_id: this.surveyorId});
        },
        user: function () {
            return Meteor.users.findOne({_id: this.userId});
        },
        currentQuestion: function () {
            return Questions.findOne({questionnaireId: this.questionnaireId, orderNumber: this.orderNumber});
        },
        totalNumberOfQuesitons: function () {
            return Questions.find({questionnaireId: this.questionnaireId}).count();
        },
        canNavigateForward: function () {
            return this.orderNumber < this.totalNumberOfQuesitons() ? true : false;
        },
        canNavigateBackward: function () {
            return this.orderNumber > 1;
        },
        moveForward: function () {
            Surveys.update({_id: this._id}, {$inc: {orderNumber: 1}});
        },
        moveBackward: function () {
            Surveys.update({_id: this._id}, {$inc: {orderNumber: -1}});
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
