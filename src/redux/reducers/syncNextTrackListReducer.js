import { SET_NEXTTRACK_LIST, APPEND_NEXTTRACK_LIST} from '../actions/type'
const initialState = {
    nextVideos: [],
    nextPageToken: ''
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_NEXTTRACK_LIST:
            return state = {
                nextVideos: action.payload,
                nextPageToken: ''
            }

        case APPEND_NEXTTRACK_LIST:
            return state = {
                nextVideos: state.nextVideos.concat(action.payload.nextVideos),
                nextPageToken: action.payload.nextPageToken
            }
        default:
            return state;
    }
}

