const { IceteaWeb3 } = require('@iceteachain/web3')
const envfile = require('envfile')
const { envPath } = require('../scripts/mode')
const config = envfile.parseFileSync(envPath)

// wrap around an Icetea node' RPC
const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)

// create a new random account, needed when calling setValue OR import your own account's private key
const main_acc = tweb3.wallet.importAccount(config.PKEY)
const mule_acc = tweb3.wallet.importAccount(config.PKEY_alt)
// Note: replace the contract address with your actual address
const contract = tweb3.contract(config.REACT_APP_CONTRACT)
const address = main_acc.address
const mule_address = mule_acc.address

const {getAnswers, sendReward,getAllQuestion, getQuestions, addQuestion, removeQuestion, removeAnswer, withdrawFromQuestion} = require('../src/web3/index')

contract.events.AddAnswer({}, (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
    }
})
contract.events.AddQuestion({}, (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
    }
})
contract.events.GaveReward({}, (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
    }
})
contract.events.RemoveAnswer({}, (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
    }
})
contract.events.RemoveQuestion({}, (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
    }
})
console.log(Object.getOwnPropertyNames(tweb3.wallet))
// contract.methods.getstateAPI().call().then(r => console.log(r))

// getAnswers("1").then(r => console.log(r), e => console.log(e))
// contract.methods.getQuestion("0").call().then(r => console.log(r), e => console.log(e))



// removeQuestion('16', address).then(r => console.log(r), e => console.log(e))
// withdrawFromQuestion('0', address).then(r => console.log(r), e => console.log(e))
// getQuestions(address).then(r => console.log(r), e => console.log(e))
const q = {
    value: 'I am Tung Duong',
    expireTime: 1575453132,
    deadline2Modify: 1575454032,
    timestamp: 1575453139,
  }
// addQuestion(q)
// getAnswers("1").then((r) => console.log(r))
