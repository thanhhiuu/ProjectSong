import actionTypers from '../actions/actionsTypes';

const initState = {
  currentSongId: null,
  currentPlay: false,
  currentPlaylist: null,
  currentLoading: true,
  currentRecent: [],
  searchSong: [],
  keywords: '',
  countryWeekchart: '',
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
    case actionTypers.RECENT_SONG:
      return {
        ...state,
        currentRecent: action?.recent
          ? [action.recent, ...state.currentRecent.slice(0, 20)]
          : state.currentRecent,
      };
    case actionTypers.SEARCH:
      return {
        ...state,
        searchSong: action?.data,
        keywords: action?.keyword,
      };
    case actionTypers.SEARCH_SONG:
      return {
        ...state,
        searchSongArtist: action?.data,
      };
    case actionTypers.COUNTRY:
      return {
        ...state,
        countryWeekchart: action?.country,
      };
    default:
      return state;
  }
};

export default musicReducer;
