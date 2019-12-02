import {combineReducers} from 'redux';
import miniPlayerReducer from './miniPlayerReducer'
import syncTrackReducer from './syncTrackReducer'
import syncPausedReducer from './syncPausedReducer'
import syncLoadingReducer from './syncLoadingReducer'
import syncLoadingNextTracks from './syncLoadingNextTracks'
import syncNextTrackListReducer from './syncNextTrackListReducer'
import { syncRepeatModeReducer, syncAutoModeReducer} from './syncMode'
export default combineReducers({
  miniPlayerReducer,
  syncTrackReducer,
  syncPausedReducer,
  syncLoadingReducer,
  syncNextTrackListReducer,
  syncRepeatModeReducer,
  syncAutoModeReducer,
  syncLoadingNextTracks
  });