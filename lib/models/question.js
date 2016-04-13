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
            Validators.required(null, i18n('selectQuestionnaireMessage')),
            Validators.string()
        ],
        categoryId: [
            Validators.string()
        ],
        typeId: [
            Validators.required(null, i18n('selectQuestionTypeMessage')),
            Validators.string()
        ],
        orderNumber: [
            Validators.required(null, i18n('provideOrderNumberMessage')),
            Validators.number()
        ],
        detail: [
            Validators.required(null, i18n('provideQuestionDetailMessage')),
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
