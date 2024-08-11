import actionTypers from './actionsTypes';

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
