module.exports = (contract, { validate, Joi }) => {
    return {
        getOne(id) {
          return contract.questions.get(id)
        },

        getThrow(id) {
          const question = contract.questions.get(id)
          if (question == null) {
            throw new Error(`Question ${id} not found.`)
          }
          return question
        },

        getList(owner, options = {}) {
            const { begin, end, countAnswer } = options
            const questions = contract.questions.query({
                filter: question => question.owner === owner,
                begin, end
            })

            if (countAnswer) {
                questions.forEach(question => {
                    question.answerCount = contract.answers.count(memo => memo.questionId === question.id)
                })
            }

            return questions
        },

        add(question) {
            question = validate(question, Joi.object({
                name: Joi.string().required(),
                age: Joi.number().min(13)
            }))
            return contract.questions.add({ ...question, owner: contract.runtime.msg.sender })
        },

        remove(id) {
            const answerIds = contract.answerHelper.getList(id, { fields: ['id'] })
            contract.answers.delete(answerIds)

            // it will return 'false' if nothing to delete
            return contract.questions.delete(id)
        },
    }
}
