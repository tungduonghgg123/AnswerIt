const { validate, stateUtil } = require(';');
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
    questionHelper = makeQuestionHelper(this, { validate, Joi })
    answerHelper = makeAnswerHelper(this, { validate, Joi })

    @transaction addQuestion(question) {
        return this.questionHelper.add(question)
    }

    @transaction removeQuestion(id: string) {
        return this.questionHelper.remove(id)
    }

    @transaction addAnswer(questionId: string, answer) {
        return this.answerHelper.add(questionId, answer)
    }

    @transaction removeAnswer(id: number) {
        return this.answerHelper.remove(id)
    }

    @view getQuestions(owner: address, options) {
        return this.questionHelper.getList(owner, options)
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
}