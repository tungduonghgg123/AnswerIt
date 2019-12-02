import { TURNON, TURNOFF } from '../actions/type';

const initialState = true;

export default function (state = initialState, action) {
    switch (action.type) {
        case TURNON:
            return state = true;

        case TURNOFF:
            return state = false;

        default:
            return state;

    }
}
