const { IceteaWeb3 } = require('@iceteachain/web3')

// const { envPath } = require('../../scripts/mode')
// const envPath = '.env'
// const config = envfile.parseFileSync(envPath)

// const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)
// const contract = tweb3.contract(config.REACT_APP_CONTRACT)
const tweb3 = new IceteaWeb3('ws://localhost:26657/websocket')
const contract = tweb3.contract('teat1pdjcljwc9rrv5c5url96nszd0xjnn2wu3x4xkr')
const main_acc = tweb3.wallet.importAccount('643YwKQMQ2ZkeCcEgE1zKYJNvUr7RxH5mAVMYDZZgH1f')
const mule_acc = tweb3.wallet.importAccount('8A7DaE1mGPJzjc17mJ1u2KpnM43RJXtLhFh5XSk8844L')
const address = main_acc.address
const mule_address = mule_acc.address


exports.addQuestion = async (question, from = address, value) => {
    try {
        await contract.methods.addQuestion(question).sendCommit({ from, payer: 'system.faucet', value })
    } catch (e) {
        //console.log('try to use money from sender...')
        try {
            contract.methods.addQuestion(question).sendCommit({ from, value })
        } catch (e) {
            throw e
        }

    }
}
exports.addQuestionEvent = (callback) => {
    contract.events.AddQuestion({}, (error, data) => {
        if (error) {
            throw error
        } else {
            callback()
            return data
        }
    })
}
exports.addAnswer = async (questionId, answer, from = address) => {
    try {
        await contract.methods.addAnswer(questionId, answer).sendCommit({ from })
    } catch (e) {
        // e - error object. It has 3 properties: name, message and stack!
        throw e
    }
}
exports.addAnswerEvent = (callback) => {
    contract.events.AddAnswer({}, (error, data) => {
        if (error) {
            throw error
        } else {
            callback()
            return data
        }
    })
}
exports.removeQuestion = async (id, from) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    try {
        await contract.methods.removeQuestion(id, timestamp).sendCommit({ from })
    } catch (e) {
        throw e
    }
}
exports.removeAnswer = async (id, from) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    try {
        await contract.methods.removeAnswer(id, timestamp).sendCommit({ from })
    } catch (e) {
        throw e
    }
}
exports.getAnswers = async (questionId) => {
    try {
        return await contract.methods.getAnswers(questionId).call()
    } catch (e) {
        throw e
    }
}
exports.getAllQuestion = async () => {
    try {
        const questions = await contract.methods.getAllQuestion().call()
        const keys = Object.keys(questions)
        let array = []
        keys.forEach((key) => {
            array[parseInt(key)] = questions[parseInt(key)]
        })
        return array
    } catch (e) {
        throw e
    }
}
exports.getQuestions = async (owner) => {
    try {
        return await contract.methods.getQuestions(owner).call()
    } catch (e) {
        throw e
    }
}
exports.sendReward = async (questionId, answerId, amount, from = mule_address) => {
    try {
        await contract.methods.sendReward(questionId, answerId, amount).sendCommit({ from })
    } catch (e) {
        throw e
    }
}
exports.withdrawFromQuestion = async (questionId, from) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    try {
        await contract.methods.withdrawFromQuestion(questionId, timestamp).sendCommit({ from })
    } catch (e) {
        throw e
    }
}