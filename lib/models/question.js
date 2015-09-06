Question = Astro.Class({
    name: 'Question',
    collection: questions,
    fields: {
        questionnaireId: 'string',
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
        questionnaireId: [
            Validators.required(null, 'Please select a Questionnaire'),
            Validators.string()
        ],
        categoryId: [
            Validators.string()
        ],
        typeId: [
            Validators.required(null, 'Please select Question Type'),
            Validators.string()
        ],
        orderNumber: [
            Validators.required(null, 'Please provide an Order Number'),
            Validators.number()
        ],
        detail: [
            Validators.required(null, 'Please provide the Question detail'),
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
        questionnaire: function () {
            return questionnaires.findOne({_id: this.questionnaireId});
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
        answers: function (surveyId) {
            return answers.find({surveyId: surveyId, questionId: this._id});
        },
        answer: function (surveyId) {
            return answers.findOne({surveyId: surveyId, questionId: this._id});
        },
        choiceAnswer: function (surveyId, orderNumber) {
            return answers.findOne({
                surveyId: surveyId,
                questionId: this._id,
                choiceOrderNumber: parseInt(orderNumber)
            });
        }
    }
});