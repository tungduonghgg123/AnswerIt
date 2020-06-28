/* global jest describe test expect beforeAll afterAll */

const { sleep, newAccounWithBalance, web3 } = require('./helper')

jest.setTimeout(30000)

let tweb3 = web3.ws()
let account100 // this key should have 100 tea before running test suite
beforeAll(async () => {
  account100 = await newAccounWithBalance(tweb3)
})

afterAll(() => {
  tweb3.close() 
})

describe('contract', () => {
  test('contract and events', async () => {
    const { address: from } = account100

    const CONTRACT_SRC = `
        const msg = this.runtime.msg;
        switch (msg.name) {
        case '__on_deployed':
            this.emitEvent('deploy', { deployer: msg.sender }, ['deployer'])
            break
        case 'test':
            return this.emitEvent('test')
            break
        }`
    
    const contract = await tweb3.deploy({ data: CONTRACT_SRC })
    await sleep(1000)
    let events = await contract.getPastEvents('*')
    expect(events.length).toBe(1)
    let deployEvent = events[0]
    expect(deployEvent.emitter).toBe(contract.address)
    expect(deployEvent.eventName).toBe('deploy')
    expect(deployEvent.eventData.deployer).toBe(from)

    events = await contract.getPastEvents('deploy')
    expect(events.length).toBe(1)
    deployEvent = events[0]
    expect(deployEvent.emitter).toBe(contract.address)
    expect(deployEvent.eventName).toBe('deploy')
    expect(deployEvent.eventData.deployer).toBe(from)

    let r = await contract.prepareMethod('test').send()
    await sleep(1000)
    events = r.events
    expect(events.length).toBe(2)
    let testEvent = events.filter(e => e.eventName === 'test')[0]
    expect(testEvent.emitter).toBe(contract.address)
    expect(testEvent.eventName).toBe('test')
    expect(testEvent.eventData).toEqual({})

    events = await contract.getPastEvents('test')
    expect(events.length).toBe(1)
    let testEvent2 = events[0]
    delete testEvent2.tx
    expect(testEvent).toEqual(testEvent2)
  })
})