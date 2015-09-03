Question = Astro.Class({
    name: 'Question',
    collection: questions,
    fields: {
        surveyId: 'string',
        categoryId: 'string',
        typeId: 'string',
        orderNumber: 'number',
        detail: 'string',
        choiceType: {
            type: 'string',
            default: 'single'
        },
        choices: {
            type: 'array',
            default: []
        }
    },
    validators: {
        surveyId: [
            Validators.required('Please select a Survey'),
            Validators.string()
        ],
        categoryId: [
            Validators.string()
        ],
        typeId: [
            Validators.required('Please select Question Type'),
            Validators.string()
        ],
        orderNumber: [
            Validators.required('Please provide an Order Number'),
            Validators.string()
        ],
        detail: [
            Validators.required('Please provide the Question deatil'),
            Validators.string()
        ],
        choiceType: [
            Validators.string()
        ],
        choices: [
            Validators.array()
        ]
    },
    methods: {
        survey: function () {
            return surveys.findOne({_id: this.surveyId});
        },
        questionCategory: function () {
            return questionCategories.findOne({_id: this.categoryId});
        },
        questionType: function () {
            return questionTypes.findOne({_id: this.typeId});
        },
        isTypeOpenEnded: function () {
            var currentQuestionType = questionTypes.findOne({_id: this.typeId});
            return currentQuestionType.name == "Open Ended";
        },
        isSingleChoice: function () {
            return this.choiceType == "Single";
        },
        answers: function (completeSurveyId) {
            return answers.find({completedSurveyId: completeSurveyId, questionId: this._id});
        },
        answer: function (completeSurveyId) {
            return answers.findOne({completedSurveyId: completeSurveyId, questionId: this._id});
        },
        choiceAnswer: function (completeSurveyId, orderNumber) {
            return answers.findOne({
                completedSurveyId: completeSurveyId,
                questionId: this._id,
                choiceOrderNumber: parseInt(orderNumber)
            });
        }
    }
});