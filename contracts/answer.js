module.exports = (contract, { validate, Joi }) => {
    return {
        getOne(id) {
          return contract.memories.get(id)
        },

        getThrow(id) {
          const memory = contract.memories.get(id)
          if (memory == null) {
            throw new Error(`Memory ${id} not found.`)
          }
          return memory
        },

        getList(lockId, options = {}) {
            const { begin, end } = options
            return contract.memories.query({
                filter: memo => memo.lockId === lockId,
                begin, end
            })
        },

        add(lockId, memory) {
            memory = validate(memory, Joi.object({
                text: Joi.string().required(),
                timestamp: Joi.date().timestamp()
            }))

            return contract.memories.add({ ...memory, lockId })
        },

        remove(id) {
            return contract.memories.delete(id)
        },
    }
}