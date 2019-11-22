const { IceteaWeb3 } = require('@iceteachain/web3')
const envfile = require('envfile')
const { envPath } = require('../scripts/mode')
const config = envfile.parseFileSync(envPath)

// wrap around an Icetea node' RPC
const tweb3 = new IceteaWeb3('wss://rpc.icetea.io/websocket')

// create a new random account, needed when calling setValue
tweb3.wallet.importAccount(config.PKEY)

// Note: replace the contract address with your actual address
const contract = tweb3.contract(config.REACT_APP_CONTRACT)

// contract.methods.getLock().call().then(function(value) {
//     console.log(value)
//     process.exit(0)
// })
const lock = {
    "name": "Tung Duong",
    "age": 22
}
contract.methods.addLock(lock).sendCommit().then(() => {
    contract.methods.getLock().call().then(function (value) {
        console.log(value)
        process.exit(0)
    })
})
