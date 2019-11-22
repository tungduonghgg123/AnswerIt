module.exports = (contract, { validate, Joi }) => {
    return {
        getOne(id) {
          return contract.questions.get(id)
        },

        getThrow(id) {
          const lock = contract.questions.get(id)
          if (lock == null) {
            throw new Error(`Lock ${id} not found.`)
          }
          return lock
        },

        getList(owner, options = {}) {
            const { begin, end, countMemory } = options
            const questions = contract.questions.query({
                filter: lock => lock.owner === owner,
                begin, end
            })

            if (countMemory) {
                questions.forEach(lock => {
                    lock.memoryCount = contract.memories.count(memo => memo.lockId === lock.id)
                })
            }

            return questions
        },

        add(lock) {
            lock = validate(lock, Joi.object({
                name: Joi.string().required(),
                age: Joi.number().min(13)
            }))
            return contract.questions.add({ ...lock, owner: contract.runtime.msg.sender })
        },

        remove(id) {
            const memoryIds = contract.memoryHelper.getList(id, { fields: ['id'] })
            contract.memories.delete(memoryIds)

            // it will return 'false' if nothing to delete
            return contract.questions.delete(id)
        },
    }
}
