module.exports = (contract, { expect, validate, Joi }) => {
    return {
        getOne(id) {
          return contract.answers.get(id)
        },

        getThrow(id) {
          const answer = contract.answers.get(id)
          if (answer == null) {
            throw new Error(`Answer ${id} not found.`)
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
                value: Joi.string().required(),
                timestamp: Joi.date().timestamp('unix').required().raw(),
                isBestAnswer: Joi.boolean(),
                reward: Joi.number().min(0),
                deadline2Modify: Joi.date().timestamp('unix').required().raw(),
            }))
            contract.emitEvent('AddAnswer', { 
                ...answer, 
                questionId, 
                owner: contract.runtime.msg.sender 
            })

            return contract.answers.add({ 
                ...answer, 
                questionId, 
                owner: contract.runtime.msg.sender 
            })
        },

        remove(id, timestamp) {
            const answer = this.getThrow(id)
            const caller = contract.runtime.msg.sender
            
            expect(caller === answer.owner, "You don't have the consent to do this!")
            expect( timestamp  <= answer.deadline2Modify, "You can't delete after 15 minutes!" )

            if(answer.reward && !answer.gaveReward) {
                contract.transfer(caller, answer.reward)
            }
            contract.emitEvent('RemoveAnswer', {id})

            return contract.answers.delete(id)
        },

        sendReward( id ) {
            // set deadline2Modify = timestamp
        }
    }
}