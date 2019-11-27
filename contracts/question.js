module.exports = (contract, { validate, Joi }) => {
    return {
        getOne(id) {
          return contract.questions.get(id)
        },

        getThrow(id) {
          const question = this.getOne(id)
          if (question == null ) {
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
                value: Joi.string().required(),
                reward: Joi.number().positive(),
                expireTime: Joi.date().timestamp('unix').raw(),
                deadline2Modify: Joi.date().timestamp('unix').required().raw(),
                timestamp: Joi.date().timestamp('unix').required().raw(),
                gaveReward: Joi.boolean()
            }))
            if(contract.runtime.msg.value) {
                question.reward = contract.runtime.msg.value 
                question.gaveReward = false
            }
            contract.emitEvent('AddQuestion', question)

            return contract.questions.add({ ...question, owner: contract.runtime.msg.sender })
        },

        remove(id, timestamp) {
            const question = this.getThrow(id)
            const caller = contract.runtime.msg.sender
            
            expect(caller === question.owner, "You don't have the consent to do this!")
            expect( timestamp  <= question.deadline2Modify, "You can't delete after 15 minutes!" )

            const answerIds = contract.answerHelper.getList(id, { fields: ['id'] })
            expect (answerIds, "You can't delete after your question got answer(s)")

            if(question.reward && !question.gaveReward) {
                contract.transfer(caller, question.reward)
            }
            contract.emitEvent('RemoveQuestion', {id})

            // it will return 'false' if nothing to delete
            return contract.questions.delete(id)
        },
    }
}
