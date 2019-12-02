import { SYNCTRACK} from '../actions/type'


const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SYNCTRACK:
            return state = action.payload;

        default:
            return state;

    }
}

