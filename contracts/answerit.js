const { expect, validate, stateUtil } = require(';');
const Joi = require('@hapi/joi');
const { path } = stateUtil(this)
const makeQuestionHelper = require('./question.js')
const makeAnswerHelper = require('./answer.js')
const {
    importState,
    exportState,
    migrateState
} = require('./migration.js')(this)

@contract class AnswerIt {

    questions = path('questions', {})
    answers = path('answers', {})
    questionHelper = makeQuestionHelper(this, { expect, validate, Joi })
    answerHelper = makeAnswerHelper(this, { expect, validate, Joi })

    @payable addQuestion(question) {
        return this.questionHelper.add(question)
    }

    @transaction removeQuestion(id: string, timestamp) {
        return this.questionHelper.remove(id, timestamp)
    }

    @transaction addAnswer(questionId: string, answer) {
        return this.answerHelper.add(questionId, answer)
    }

    @transaction removeAnswer(id: string, timestamp) {
        return this.answerHelper.remove(id, timestamp)
    }

    @view getQuestions(owner: address, options) {
        return this.questionHelper.getList(owner, options)
    }
    @view getQuestion(id) {
        return this.questionHelper.getOne(id)
    }
    @view getAllQuestion() {
        return this.questions.query()
    }

    @view getAnswers(questionId: string, options) {
        return this.answerHelper.getList(questionId, options)
    }
    @view getAnswer(id) {
        return this.answerHelper.getOne(id)
    }
    /**
     * 
     * @param {string} questionId 
     * @param {string} answerId 
     * @param {number} amount optional
     * VERSION 1: send all reward at once.
     */
    @transaction sendReward(questionId, answerId, amount) {
        questionId = validate(questionId, Joi.string())
        answerId = validate(answerId, Joi.string())
    
        const question = this.getQuestion(questionId)

        // check question's owner
        expect(question.owner === msg.sender, "You don't have the consent to do this!")
        // eligible to give reward
        expect(!question.gaveReward, "You already gave reward!")
        if(amount) {

            amount = validate(amount, Joi.number().positive().max(parseInt(question.reward)))
        } else {
            amount = question.reward
        }
        
        // get answerID's owner => recipient
        const answer = this.getAnswer(answerId)

        // check whether answer belongs to this question
        expect(questionId === answer.questionId, "This is not an answer from this question id!")
        const recipient = answer.owner
        // send
        expect( amount <= this.balance, "Contract doesn't have enough balance!")
        this.transfer(recipient, amount)

        // update question and answer => close thread ( not allow them to be changed)
        const current = Math.round(new Date().getTime() / 1000)
        this.answers.set(answerId,{
            ...answer,
            isBestAnswer: true,
            reward: amount,
            deadline2Modify: current
        } )

        this.questions.set(questionId, {
            ...question,
            gaveReward: true,
            resolved: true,
            deadline2Modify: current
        })
        this.emitEvent('GaveReward', this.getAnswer(answerId))
    }



    @transaction migrateState(fromContract: string, overwrite: ?bool = false) {
        return migrateState(fromContract, overwrite)
    }
    @view exportState() {
        return exportState()
    }

    @transaction importState(data, overwrite: ?bool = false) {
        return importState(data, overwrite)
    }
    /// testing purpose
    @view getstateAPI() {
        return (Object.getOwnPropertyNames(this.questions))
    }
    /**
     * 
     * @param {string} questionId 
     * withdraw deposited money when user create a new question
     */
    @transaction withdrawFromQuestion( id: string, timestamp ) {
        return this.questionHelper.withdraw(id, timestamp)
    }
}