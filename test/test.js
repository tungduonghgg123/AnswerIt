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
