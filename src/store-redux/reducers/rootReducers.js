import storage from 'redux-persist/lib/storage';
import appReducers from './appReducers';
import { combineReducers } from 'redux';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import musicReducer from './musicReducers';

const persistAll = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...persistAll,
  key: 'music',
  whitelist: [
    'currentSongId',
    'currentPlaylist',
    'currentPlay',
    'currentLoading',
    'currentRecent',
  ],
};
const rootReducers = combineReducers({
  app: appReducers,
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducers;
