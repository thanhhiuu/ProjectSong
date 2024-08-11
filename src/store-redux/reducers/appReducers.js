import actionTypers from '../actions/actionsTypes';

const initState = {
  banner: [],
  chill: [],
  title: [],
  top100: [],
  remix: [],
  newrelease: [],
  weekchart: [],
  halbum: [],
  liveradio: [],
};
const appReducers = (state = initState, action) => {
  switch (action.type) {
    case actionTypers.GET_HOME:
      console.log(action, 'action');
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionType === 'banner')
            ?.items || null,
        chill:
          action.homeData?.find((item) => item.sectionType === 'playlist')
            ?.items || null,
        halbum:
          action.homeData?.find((item) => item.sectionId === 'hAlbum') || [],
        top100:
          action.homeData?.find((item) => item.sectionId === 'h100')?.items ||
          null,
        remix:
          action.homeData?.find((item) => item.sectionId === 'hEditorTheme3')
            ?.items || null,
        newrelease:
          action.homeData?.find((item) => item.sectionType === 'new-release')
            ?.items || null,
        title: action.homeData || null,
        weekchart:
          action.homeData?.find((item) => item.sectionType === 'weekChart')
            ?.items || [],
        liveradio:
          action.homeData?.find((item) => item.sectionId === 'hLiveRadio')
            ?.items || [],
      };

    default:
      return state;
  }
};

export default appReducers;
