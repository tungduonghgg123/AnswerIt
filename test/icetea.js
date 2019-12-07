const { IceteaWeb3 } = require('@iceteachain/web3')
const envfile = require('envfile')
const { envPath } = require('../scripts/mode')
const config = envfile.parseFileSync(envPath)
const {toTEA, toUNIT} = require('/Users/duongtung/Workspace/answerit/src/web3/common.js')
// wrap around an Icetea node' RPC
const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)

// create a new random account, needed when calling setValue OR import your own account's private key
const account = tweb3.wallet.importAccount(config.PKEY)
const mule_acc = tweb3.wallet.importAccount(config.PKEY_alt1)
const contractAddr = config.REACT_APP_CONTRACT

async function getAddressInfo (address) {
    try {

      const info = await tweb3.getAccountInfo(address)      
    console.log(info )

    process.exit(0)

    } catch (error) {
      console.log(error)
    }
  }
async function getFaucet(address) {
    tweb3.contract('system.faucet').methods.request(/* address */).sendCommit({ from: address, payer: 'system.faucet' })
      .then(r => {
          console.log(r)
      })
      .catch(error => {
        console.error(error)
      })
}

// getFaucet()
getAddressInfo('teat1pdjcljwc9rrv5c5url96nszd0xjnn2wu3x4xkr')
// tweb3.transfer('teat1pdjcljwc9rrv5c5url96nszd0xjnn2wu3x4xkr',  toUNIT(100), {from: mule_acc.address, payer: 'system.faucet'})