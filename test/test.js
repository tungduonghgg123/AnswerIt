const { IceteaWeb3 } = require('@iceteachain/web3')
const envfile = require('envfile')
const { envPath } = require('../scripts/mode')
const config = envfile.parseFileSync(envPath)

// wrap around an Icetea node' RPC
const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)

// create a new random account, needed when calling setValue OR import your own account's private key
tweb3.wallet.importAccount(config.PKEY)

// Note: replace the contract address with your actual address
const contract = tweb3.contract(config.REACT_APP_CONTRACT)

// contract.methods.getQuestion().call().then(function(value) {
//     console.log(value)
//     process.exit(0)
// })
const question = {
    "name": "what is the result of 1 + 1??",
    "age": 22
}
const answer = {
    "text":  "the answer is 2",
    "timestamp": 1574610622
}
contract.methods.addQuestion(question).sendCommit().then(() => {
    contract.methods.addAnswer("0", answer ).sendCommit().then(() => {
        contract.methods.getAnswers("0").call().then((value)=> {
            console.log(value)
            process.exit(0)
        })
    })
})


