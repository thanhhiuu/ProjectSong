import actionTypers from '../actions/actionsTypes';

const initState = {
  currentSongId: null,
  currentPlay: false,
  currentPlaylist: null,
  currentLoading: true,
};
const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypers.GET_SONG:
      // console.log(action, 'action');
      return {
        ...state,
        currentSongId: action?.songID || null,
      };
    case actionTypers.PLAY:
      return {
        ...state,
        currentPlay: action?.play || false,
      };
    case actionTypers.PLAYLIST:
      return {
        ...state,
        currentPlaylist: action?.playList,
      };
    case actionTypers.LOADING:
      return {
        ...state,
        currentLoading: action?.loading,
      };
    default:
      return state;
  }
};

export default musicReducer;
