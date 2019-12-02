import { LOADING_NEXTTRACK_LIST} from '../actions/type'

const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_NEXTTRACK_LIST:
            return state = action.payload;
        default:
            return state;
    }
}