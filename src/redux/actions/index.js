import { TURNON, TURNOFF, SYNCTRACK, PAUSED, LOADING, SET_NEXTTRACK_LIST,
    APPEND_NEXTTRACK_LIST, AUTO_ON, AUTO_OFF, REPEAT_ON, REPEAT_OFF, 
    AUTO_REVERSE, REPEAT_REVERSE, LOADING_NEXTTRACK_LIST} from './type';

export const miniPlayerOn = () => ({ type: TURNON })
export const miniPlayerOff = () => ({ type: TURNOFF })
export const syncPaused = (pauseState) => ({ type: PAUSED, payload: pauseState })
export const syncLoading = (loadingState) => ({ type: LOADING, payload: loadingState })
export const syncLoadingNextTracks = (loadingState) => ({ type: LOADING_NEXTTRACK_LIST, payload: loadingState });
export const syncTrack = (track) => ({ type: SYNCTRACK, payload: track })
export const setSuggestedNextTracks = (nextVideos) => ({type: SET_NEXTTRACK_LIST, payload: nextVideos})
export const appendNextTracks = (nextVideos, nextPageToken) => ({type: APPEND_NEXTTRACK_LIST, payload: {nextVideos, nextPageToken}})
export const repeatModeOn = () => ({type: REPEAT_ON} )
export const repeatModeOff = () => ({type: REPEAT_OFF})
export const repeatReverse = () => ({type: REPEAT_REVERSE})
export const autoModeOn = () => ({type: AUTO_ON} )
export const autoModeOff = () => ({type: AUTO_OFF} )
export const autoReverse = () => ({type: AUTO_REVERSE})
