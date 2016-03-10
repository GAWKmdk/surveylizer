Question = Astro.Class({
    name: 'Question',
    collection: Questions,
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
            default: function(){
                return [];
            }
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
            return Questionnaires.findOne({_id: this.questionnaireId});
        },
        questionCategory: function () {
            return QuestionCategories.findOne({_id: this.categoryId});
        },
        questionType: function () {
            return QuestionTypes.findOne({_id: this.typeId});
        },
        isTypeOpenEnded: function () {
            var currentQuestionType = QuestionTypes.findOne({_id: this.typeId});
            return currentQuestionType.name == "Open Ended";
        },
        isSingleChoice: function () {
            return this.choiceType == "Single";
        },
        answers: function (surveyId) {
            return Answers.find({surveyId: surveyId, questionId: this._id});
        },
        answer: function (surveyId) {
            return Answers.findOne({surveyId: surveyId, questionId: this._id});
        },
        choiceAnswer: function (surveyId, orderNumber) {
            return Answers.findOne({
                surveyId: surveyId,
                questionId: this._id,
                choiceOrderNumber: parseInt(orderNumber)
            });
        }
    }
});
