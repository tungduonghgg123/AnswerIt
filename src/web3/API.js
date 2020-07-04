import {toTEA} from '../helper/common'
import { IceteaWeb3 } from '@iceteachain/web3'
import {getAliasAndTags} from '../helper/account'
import { isLength } from 'lodash'
const tweb3 = new IceteaWeb3(process.env.REACT_APP_RPC)
// resolve contract
let contract = tweb3.contract(process.env.REACT_APP_CONTRACT)
const resolveContract = async () => {
    console.log('resolve contract executed')
    // return a contract instance using address instead of alias.
    const address = await tweb3.contract('system.alias').methods.resolve(process.env.REACT_APP_CONTRACT).call()
    return tweb3.contract(address)
}

export const addQuestion = async (question, from , payer, value) => {
    try {
        await contract.methods.addQuestion(question).sendCommit({ 
            from, signers: payer, value 
        })
    } catch (e) {
        throw e
    }
}
export const addAnswer = async (questionId, answer, from, tokenKey) => {
try {
    await contract.methods.addAnswer(questionId, answer).sendCommit({ from, signers: tokenKey })
} catch (e) {
    // e - error object. It has 3 properties: name, message and stack!
    throw e
}
}
export const removeQuestion = async (id, from) => {
const timestamp = Math.round(new Date().getTime() / 1000)
try {
    await contract.methods.removeQuestion(id, timestamp).sendCommit({ from })
} catch (e) {
    throw e
}
}
export const removeAnswer = async (id, from) => {
const timestamp = Math.round(new Date().getTime() / 1000)
try {
    await contract.methods.removeAnswer(id, timestamp).sendCommit({ from })
} catch (e) {
    throw e
}
}
export const getAnswers = async (questionId) => {
try {
    let answers = await contract.methods.getAnswers(questionId).call()
    answers = await Promise.all(answers.map(async (answer) => {
        const owner = answer.owner
        const aliasAndInfo = await getAliasAndTags(owner)
        return ({
            ...answer,
            username: aliasAndInfo[0],
            ...aliasAndInfo[1]
        })
    }))
    console.log(answers)
    return answers
} catch (e) {
    throw e
}
}
export const getAllQuestion = async () => {
try {
    // questions is an object.
    const questionsObj = await contract.methods.getAllQuestion().call()
    const keys = Object.keys(questionsObj)
    let questions = []
    keys.forEach((key) => {
        questions[parseInt(key)] = questionsObj[parseInt(key)]
    })
    // get display-name
    questions = await Promise.all(questions.map(async (question) => {
        const owner = question.owner
        const aliasAndInfo = await getAliasAndTags(owner)
        return ({
            ...question,
            username: aliasAndInfo[0],
            ...aliasAndInfo[1]
        })
    }))
    return questions
} catch (e) {
    throw e
}
}
export const getQuestions = async (owner) => {
try {
    return await contract.methods.getQuestions(owner).call()
} catch (e) {
    throw e
}
}
export const sendReward = async (questionId, answerId, amount, from) => {
try {
    await contract.methods.sendReward(questionId, answerId, amount).sendCommit({ from })
} catch (e) {
    throw e
}
}
export const sendRewardEvent = async (callback) => {
contract = await resolveContract()
contract.events.GaveReward({}, (error, data) => {
    if (error) {
        throw error
    } else {
        callback()
        return data
    }
})
}
export const addAnswerEvent = async (callback) => {
contract = await resolveContract()
contract.events.AddAnswer({}, (error, data) => {
    if (error) {
        throw error
    } else {
        callback()
        return data
    }
})
}
export const addQuestionEvent = async (callback) => {
contract = await resolveContract()
contract.events.AddQuestion({}, (error, data) => {
    if (error) {
        throw error
    } else {
        callback()
        return data
    }
})
}
export const balanceChangeEvent = (from, callback) => {

tweb3.subscribe('Tx', { from }, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
    // if(result.tags.Transfered)
    //     callback()
})
}
export const withdrawFromQuestion = async (questionId, from) => {
const timestamp = Math.round(new Date().getTime() / 1000)
try {
    await contract.methods.withdrawFromQuestion(questionId, timestamp).sendCommit({ from })
} catch (e) {
    throw e
}
}
export const getBalance = async (address) => {
try {

const info = await tweb3.getAccountInfo(address)      
return toTEA(info.balance)

} catch (error) {
  console.log(error)
}
}