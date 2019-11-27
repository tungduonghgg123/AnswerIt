const { IceteaWeb3 } = require('@iceteachain/web3')
const envfile = require('envfile')
const { envPath } = require('../scripts/mode')
const config = envfile.parseFileSync(envPath)
const { toUNIT } = require('../src/web3/common.js')

// wrap around an Icetea node' RPC
const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)

// create a new random account, needed when calling setValue OR import your own account's private key
const main_acc = tweb3.wallet.importAccount(config.PKEY)
const mule_acc = tweb3.wallet.importAccount(config.PKEY_alt)
// Note: replace the contract address with your actual address
const contract = tweb3.contract(config.REACT_APP_CONTRACT)
const address = main_acc.address
const mule_address = mule_acc.address
// contract.methods.getQuestion().call().then(function(value) {
//     console.log(value)
//     process.exit(0)
// })
const question = {
    "value": "what is the result of 1 + 19??",
    "expireTime": 1574610622,
    "timestamp": Math.round(new Date().getTime() / 1000),
    "deadline2Modify": Math.round(new Date().getTime() / 1000),

}
const ordinaryQuestion = {
    "value": "who is Hugh Jackman?",
    "deadline2Modify": Math.round(new Date().getTime() / 1000) + 15 * 60,
}
const answer = {
    // "value": "2",
    "timestamp": 1574610622,
    "deadline2Modify": 1574610622 + 15 * 60,
    "reward": -1,
    "isBestAnswer": true
}
const { addQuestion, addAnswer } = require('../src/web3/index')

// addQuestion(question, address, toUNIT(0.5)).then(r => {
// }).catch((e) => {
//     console.log(e)
// })
// addAnswer("4", answer, mule_address)
// removeQuestion("0", address).then(r => {
//     console.log(r)
// }).catch((e) => {
//     console.log(e)
// })

// contract.events.RemoveQuestion({}, (error, data) => {
//     if (error) {
//         console.error(error)
//     } else {
//         console.log(data)
//     }
// })
// contract.methods.getQuestions(address).call().then((r) => {
//     console.log(r)
// })
// contract.events.AddQuestion({}, (error, data) => {
//     if (error) {
//         console.error(error)
//       } else {
//         console.log(data)
//     }
// })
contract.events.AddAnswer({}, (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
    }
})
const _answer = {
    "value": "2",
    "timestamp": Math.round(new Date().getTime() / 1000),
    "deadline2Modify": Math.round(new Date().getTime() / 1000) + 15 * 60,
}
const { data } = require('../scripts/data')

data.data.forEach(async (thread, index) => {
    const question = {
        "value": thread.question,
        "expireTime": Math.round(new Date().getTime() / 1000) + 3600,
        "timestamp": Math.round(new Date().getTime() / 1000),
        "deadline2Modify": Math.round(new Date().getTime() / 1000) + 15 * 60,
    }
    try {
        await addQuestion(question, address, toUNIT(0.5))
        thread.answers.forEach(async (_answer) => {
            const answer = {
                "value": _answer,
                "timestamp": Math.round(new Date().getTime() / 1000),
                "deadline2Modify": Math.round(new Date().getTime() / 1000) + 15 * 60,
            }
            try {
                await addAnswer("0", answer, mule_address)


            } catch (e) {
                // throw new Error(e)
                console.log(e)
            }
        })

    }
    catch (e) {
        throw new Error(e)
    }


})
addAnswer("0", answer, mule_address)