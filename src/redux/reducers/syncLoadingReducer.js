import { LOADING} from '../actions/type';

const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return state = action.payload;
        default:
            return state;
    }
}