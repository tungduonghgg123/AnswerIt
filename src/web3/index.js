const { IceteaWeb3 } = require('@iceteachain/web3')
const envfile = require('envfile')
const { envPath } = require('../../scripts/mode')
const config = envfile.parseFileSync(envPath)

// wrap around an Icetea node' RPC
const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)
const contract = tweb3.contract(config.REACT_APP_CONTRACT)


exports.addQuestion = async ( question, from, value) => {
    try {
        await contract.methods.addQuestion(question).sendCommit({ from, payer: 'system.faucet', value })
    } catch (e) {
        console.log('try to use money from sender...')
        try {
            contract.methods.addQuestion(question).sendCommit({ from, value })
        } catch (e) {
            throw new Error('you cannot add question due to the excess use of free ICETEA', e)
        }

    }
}
exports.addAnswer = async ( questionId, answer, from) => {
    try {
        await contract.methods.addAnswer(questionId, answer).sendCommit({from})
    } catch (e) {
        throw new Error('add answer failed', e)
    }
}
exports.removeQuestion = async (id, from) => {
    const timestamp = Math.round(new Date().getTime()/1000)
    try {
        await contract.methods.removeQuestion(id, timestamp).sendCommit({ from })
    } catch (e) {
        throw new Error('can not remove', e)
    }
}
exports.removeAnswer = async (id, from) => {
    const timestamp = Math.round(new Date().getTime()/1000)
    try {
        await contract.methods.removeAnswer(id, timestamp).sendCommit({ from })
    } catch (e) {
        throw new Error('can not remove', e)
    }
}