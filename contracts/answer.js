module.exports = (contract, { validate, Joi }) => {
    return {
        getOne(id) {
          return contract.answers.get(id)
        },

        getThrow(id) {
          const memory = contract.answers.get(id)
          if (memory == null) {
            throw new Error(`Memory ${id} not found.`)
          }
          return memory
        },

        getList(lockId, options = {}) {
            const { begin, end } = options
            return contract.answers.query({
                filter: memo => memo.lockId === lockId,
                begin, end
            })
        },

        add(lockId, memory) {
            memory = validate(memory, Joi.object({
                text: Joi.string().required(),
                timestamp: Joi.date().timestamp()
            }))

            return contract.answers.add({ ...memory, lockId })
        },

        remove(id) {
            return contract.answers.delete(id)
        },
    }
}