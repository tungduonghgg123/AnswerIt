const { IceteaWeb3 } = require('@iceteachain/web3')
// to store contract addresses
const contracts = {}
export const getWeb3 = ()  =>  new IceteaWeb3(process.env.REACT_APP_RPC)
export const getContract = (address = process.env.REACT_APP_CONTRACT) => {
    if (!contracts[address]) {
        contracts[address] = getWeb3().contract(address)
    }
    return contracts[address]
}

export const getAliasContract = () => getContract('system.alias')
export const getDidContract = () => getContract('system.did')
export const grantAccessToken = (mainAddress, tokenAddress, remember, sendType = 'sendCommit') => {
    const did = getDidContract().methods;
    const expire = remember ? process.env.REACT_APP_TIME_EXPIRE : process.env.REACT_APP_DEFAULT_TIME_EXPIRE;
    const method = did.grantAccessToken(mainAddress, [process.env.REACT_APP_CONTRACT, 'system.did'], tokenAddress, +expire)
    return method[sendType]({ from: mainAddress })
}