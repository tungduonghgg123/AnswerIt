import { SET_ACCOUNT, OWNER_2_INDEX} from '../actions/type';

const accounts = [
    'teat1m35d5fdvcrs8hppt7vztz9sh469mja0qgkwq5t',
    'teat18shxhz4fyrlrwz5tunjugf8a4ddqfdhs5my2kh',
    'teat1925ny8glakj0k7zakn9huxeyfdffvqjgaka3pm',
    'teat1nlum6mwqcr8u4ukpl084um2qad8ll4p8f42gjl',
    'teat1lyh2u6err6k336e5sxtzgsvynr8guzelamjt98',
    'teat18lpmnpgprv0rwz0rzueu0tyc28eqxj0a5cc5fq',
    'teat10sycvyxlslwhyq2mg9gdpujk78rxm0yceyfcen'
]
function setAccountReducer (state = accounts[0], action) {
    switch (action.type) {
        case SET_ACCOUNT:
            return state = accounts[action.payload]
                
        default:
            return state

    }
}
function account2Index (address) {
    return accounts.findIndex(acc => acc === address)
}
export {
    setAccountReducer,
    account2Index
}