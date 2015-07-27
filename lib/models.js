User = Astro.Class({
    name: 'User',
    collection: Meteor.users,
    fields: {
        services: 'object',
        emails: 'array',
        profile: 'object',
        createdAt: {
            type: 'date',
            default: new Date().getTime()
        }
    },
    methods: {
        fullName: function(){
            return this.profile.firstName + " " + this.profile.lastName;
        }
    }
});

Role = Astro.Class({
    name: 'Role',
    collection: roles,
    fields: {
        name: 'string',
        permissions: {
            type: 'array',
            default: []
        }
    }
});

Permission = Astro.Class({
    name: 'Permission',
    collection: permissions,
    fields: {
        name: 'string'
    }
});

Survey = Astro.Class({
    name: 'Survey',
    collection: surveys,
    fields: {
        name: 'string',
        code: 'string',
        description: 'string',
        createdAt: {
            type: 'date',
            default: new Date().getTime()
        }
    },
    methods: {
        questions: function(){
            return questions.find({surveyId: this._id});
        }
    }
});

QuestionType = Astro.Class({
    name: 'QuestionType',
    collection: questionTypes,
    fields: {
        name: 'string'
    }
});

QuestionCategory = Astro.Class({
    name: 'QuestionCategory',
    collection: questionCategories,
    fields: {
        name: 'string'
    }
});

Surveyor = Astro.Class({
    name: 'Surveyor',
    collection: surveyors,
    fields: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        telephone: 'string',
        position: 'string'
    },
    methods: {
        fullName: function(){
            return this.firstName + " " + this.lastName;s
        }
    }
});

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
    methods: {
        survey: function(){
            return surveys.findOne({_id: this.surveyId});
        },
        questionCategory: function(){
            return questionCategories.findOne({_id: this.categoryId});
        },
        questionType: function(){
            return questionTypes.findOne({_id: this.typeId});
        },
        isTypeOpenEnded: function(){
            var currentQuestionType = questionTypes.findOne({_id: this.typeId});
            return currentQuestionType.name == "Open Ended";
        },
        isSingleChoice: function(){
            return this.choiceType == "Single";
        },
        answers: function(completeSurveyId){
            return answers.find({completedSurveyId: completeSurveyId, questionId: this._id});
        }
    }
});

CompletedSurvey = Astro.Class({
    name: 'CompletedSurvey',
    collection: completedSurveys,
    fields: {
        surveyId: 'string',
        surveyorId: 'string',
        userId: 'string',
        startDate: {
            type: 'date',
            default: new Date().getTime()
        },
        endDate: {
            type: 'date',
            default: null
        },
        status: {
            type: 'string',
            default: 'started'
        },
        orderNumber: {
            type: 'number',
            default: 1
        }
    },
    methods: {
        survey: function(){
            return surveys.findOne({_id: this.surveyId});
        },
        surveyor: function(){
            return surveyors.findOne({_id: this.surveyorId});
        },
        user: function(){
            return Meteor.users.findOne({_id: this.userId});
        },
        currentQuestion: function(){
            return questions.findOne({surveyId: this.surveyId, orderNumber: this.orderNumber});
        },
        totalNumberOfQuesitons: function(){
            return questions.find({surveyId: this.surveyId}).count();
        },
        canNavigateForward: function(){
            return this.orderNumber < this.totalNumberOfQuesitons() ? true : false;
        },
        canNavigateBackward: function(){
            return this.orderNumber > 1;
        },
        moveForward: function(){
            completedSurveys.update({_id: this._id}, {$inc: {orderNumber: 1}});
        },
        moveBackward: function(){
            completedSurveys.update({_id: this._id}, {$inc: {orderNumber: -1}});
        },
        timeStarted: function(){
            return moment(this.startDate).fromNow();
        },
        startDateDisplay: function(){
            return moment(this.startDate).format("DD-MM-YYYY hh:mm A");
        },
        endDateDisplay: function(){
            return moment(this.startDate).format("DD-MM-YYYY hh:mm A");
        }
    }
});


Answer = Astro.Class({
    name: 'Answer',
    collection: answers,
    fields: {
        completedSurveyId: 'string',
        questionId: 'string',
        value: 'string',
        choiceOrderNumber: {
            type: 'number',
            default: 0
        }
    },
    methods: {
        completedSurvey: function(){
            return completedSurveys.findOne({_id: this.completedSurveyId});
        },
        question: function(){
            return questions.findOne({_id: this.questionId});
        }
    }
});





