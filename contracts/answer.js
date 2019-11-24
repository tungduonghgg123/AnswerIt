module.exports = (contract, { validate, Joi }) => {
    return {
        getOne(id) {
          return contract.answers.get(id)
        },

        getThrow(id) {
          const answer = contract.answers.get(id)
          if (answer == null) {
            throw new Error(`Memory ${id} not found.`)
          }
          return answer
        },

        getList(questionId, options = {}) {
            const { begin, end } = options
            return contract.answers.query({
                filter: memo => memo.questionId === questionId,
                begin, end
            })
        },

        add(questionId, answer) {
            answer = validate(answer, Joi.object({
                text: Joi.string().required(),
                timestamp: Joi.date().timestamp('unix').raw()
            }))

            return contract.answers.add({ ...answer, questionId })
        },

        remove(id) {
            return contract.answers.delete(id)
        },
    }
}