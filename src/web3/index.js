const { IceteaWeb3 } = require('@iceteachain/web3')
const {toTEA} = require('./common')
// to store contract addresses
const contracts = {}

// const { envPath } = require('../../scripts/mode')
// const envPath = '.env'
// const config = envfile.parseFileSync(envPath)

// const tweb3 = new IceteaWeb3(config.REACT_APP_RPC)
// const contract = tweb3.contract(config.REACT_APP_CONTRACT)

// LOCAL CONTRACT 
const tweb3 = new IceteaWeb3('ws://localhost:26657/websocket')
const contract = tweb3.contract('teat1pdjcljwc9rrv5c5url96nszd0xjnn2wu3x4xkr')
export const getWeb3 = ()  =>  tweb3
export const getContract = (address = contract) => {
    if (!contracts[address]) {
        contracts[address] = getWeb3().contract(address)
    }
    return contracts[address]
}

export const getAliasContract = () => getContract('system.alias')
export const getDidContract = () => getContract('system.did')

// ONLINE CONTRACT
// const tweb3 = new IceteaWeb3('wss://rpc.icetea.io/websocket')
// const contract = tweb3.contract('teat1fpc4tknvtyt8vuuv4e2fwzyl57humvlgdshas4')


tweb3.wallet.importAccount('643YwKQMQ2ZkeCcEgE1zKYJNvUr7RxH5mAVMYDZZgH1f')
tweb3.wallet.importAccount('8A7DaE1mGPJzjc17mJ1u2KpnM43RJXtLhFh5XSk8844L')
tweb3.wallet.importAccount('AamnYmsHSUUL33ceqdUKMBmoYiGPXpCr3uEAN5e56ycJ')
tweb3.wallet.importAccount('EtHWQqZ9eP7rixn2RxA3xRhFeV9HQrFEw1pUuPtJrTjB')
tweb3.wallet.importAccount('ETcFN4WdQPiJysBbcEC3mSWkEP8oQ2jFpW4aF3kPAVij')
tweb3.wallet.importAccount('CbUFvWuBNdH3xxkspzyWZu66PL8q4gAd8zK1Z78g6Ttt')
tweb3.wallet.importAccount('6JjCo9diGK1LKYfSGrfvk7fqMgDoeSr94cBVmadhUp7G')

export const addQuestion = async (question, from , value) => {
    // try {
    //     console.log(from)
    //     await contract.methods.addQuestion(question).sendCommit({ from, payer: 'system.faucet', value })
    // } catch (e) {
    //     //console.log('try to use money from sender...')
    //     try {
    //         contract.methods.addQuestion(question).sendCommit({ from, value })
    //     } catch (e) {
    //         throw e
    //     }
    // }
        try {
            await contract.methods.addQuestion(question).sendCommit({ from, value })
        } catch (e) {
            throw e
        }
}
export const addQuestionEvent = (callback) => {
    contract.events.AddQuestion({}, (error, data) => {
        if (error) {
            throw error
        } else {
            callback()
            return data
        }
    })
}
export const addAnswer = async (questionId, answer, from) => {
    try {
        await contract.methods.addAnswer(questionId, answer).sendCommit({ from })
    } catch (e) {
        // e - error object. It has 3 properties: name, message and stack!
        throw e
    }
}
export const addAnswerEvent = (callback) => {
    contract.events.AddAnswer({}, (error, data) => {
        if (error) {
            throw error
        } else {
            callback()
            return data
        }
    })
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
        return await contract.methods.getAnswers(questionId).call()
    } catch (e) {
        throw e
    }
}
export const getAllQuestion = async () => {
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
export const sendRewardEvent = (callback) => {
    contract.events.GaveReward({}, (error, data) => {
        if (error) {
            throw error
        } else {
            callback()
            return data
        }
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
export const balanceChangeEvent = (from, callback) => {
    tweb3.subscribe('Tx', { from }, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        if(result.tags.Transferred)
            callback()
    })

}