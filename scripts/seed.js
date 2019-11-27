const envfile = require('envfile')
const fs = require('fs')
const { toPkey } = require('./mnemonic')
const { transpile } = require('@iceteachain/sunseed')
const { IceteaWeb3 } = require('@iceteachain/web3')

const { mode, envPath } = require('./mode')


// load config
console.log(`Load RPC endpoint from ${envPath}`)
const config = envfile.parseFileSync(envPath)
const endpoint = config.REACT_APP_RPC

const { data } = require('./data')
const { addQuestion, addAnswer } = require('../src/web3/index')
const { toUNIT } = require('../src/web3/common')

    ; (async () => {


        // connect to Icetea RPC
        const tweb3 = new IceteaWeb3(endpoint)
        console.log(`Connected to ${endpoint}.`)

        // create a private key
        let pkey = config.PKEY || process.env.PKEY
        if (!pkey) {
            const seed = config.MNEMONIC || process.env.MNEMONIC
            if (seed) {
                pkey = toPkey(seed)
            }
        }

        let account
        if (pkey) {
            account = tweb3.wallet.importAccount(pkey)
        } else {
            account = tweb3.wallet.createBankAccount()
        }


        console.log(`Deploying from ${account.address}...`)

        tweb3.onError(console.error)

        // set up some information
        const main_acc = tweb3.wallet.importAccount(config.PKEY)
        const mule_acc = tweb3.wallet.importAccount(config.PKEY_alt)
        const address = main_acc.address
        const mule_address = mule_acc.address

        // add questions

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
                    console.log(_answer)
                    const answer = {
                        "value": _answer,
                        "timestamp": Math.round(new Date().getTime() / 1000),
                        "deadline2Modify": Math.round(new Date().getTime() / 1000) + 15 * 60,
                    }
                    try {
                        await addAnswer(index, answer, mule_address)

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


        // process.exit(0)

    })();
