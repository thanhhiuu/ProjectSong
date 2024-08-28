import actionTypers from './actionsTypes';
import * as apis from '../../apis/index';
export const setSongId = (sid) => ({
  type: actionTypers.GET_SONG,
  songID: sid,
});
export const setPlaylist = (sid) => ({
  type: actionTypers.PLAYLIST,
  playList: sid,
});

export const setPlay = (flag) => ({
  type: actionTypers.PLAY,
  play: flag,
});
export const setLoading = (flag) => ({
  type: actionTypers.LOADING,
  loading: flag,
});
export const setRecent = (value) => ({
  type: actionTypers.RECENT_SONG,
  recent: value,
});

export const setCountry = (country) => ({
  type: actionTypers.COUNTRY,
  country: country,
});
export const apiSearch = (keyword) => async (dispatch) => {
  try {
    const response = await apis.search(keyword);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypers.SEARCH,
        data: response?.data.data,
        keyword: keyword,
      });
    } else {
      dispatch({
        type: actionTypers.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypers.SEARCH,
      data: null,
    });
  }
};
export const apiSearchSong = (pid) => async (dispatch) => {
  try {
    const response = await apis.searchSong(pid);
    // console.log(response, ' rrrr');
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypers.SEARCH_SONG,
        data: response?.data?.data,
      });
    } else {
      dispatch({
        type: actionTypers.SEARCH_SONG,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypers.SEARCH_SONG,
      data: null,
    });
  }
};
