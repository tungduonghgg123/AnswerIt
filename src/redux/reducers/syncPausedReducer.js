import { PAUSED} from '../actions/type'


const initialState = true;

export default function (state = initialState, action) {
    switch (action.type) {
        case PAUSED:
            return state = action.payload;
        default:
            return state;

    }
}

