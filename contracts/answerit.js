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

    @transaction removeAnswer(id: number, timestamp) {
        return this.answerHelper.remove(id, timestamp)
    }

    @view getQuestions(owner: address, options) {
        return this.questionHelper.getList(owner, options)
    }
    @view getQuestion(id) {
        return this.questionHelper.getOne(id)
    }
    @view getAnswers(questionId: string, options) {
        return this.answerHelper.getList(questionId, options)
    }
    @view getAllQuestion() {
        return this.questions.query()
    }
    @transaction migrateState(fromContract: address, overwrite: ?bool = false) {
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
}