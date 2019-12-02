import { AUTO_ON, AUTO_OFF,AUTO_REVERSE, REPEAT_ON, REPEAT_OFF, REPEAT_REVERSE,  } from '../actions/type'

export function syncRepeatModeReducer(state = false, action) {
    switch (action.type) {
        case REPEAT_ON:
            state = true;
            return state;
        case REPEAT_OFF:
            state = false;
            return state;
        case REPEAT_REVERSE:
            return state = !state;
        default:
            return state;
    }
}
export function syncAutoModeReducer(state = true, action) {
    switch (action.type) {
        case AUTO_ON:
            state = true;
            return state;
        case AUTO_OFF:
            state = false;
            return state;
        case AUTO_REVERSE:
            return state = !state;
        default:
            return state;
    }
}