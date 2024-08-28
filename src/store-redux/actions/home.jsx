import actionTypers from './actionsTypes';
import * as apis from '../../apis';
export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome();
    // console.log(response, 'response');
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypers.GET_HOME,
        homeData: response.data.data.items,
      });
    } else {
      dispatch({
        type: actionTypers.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypers.GET_HOME,
      homeData: null,
    });
  }
};
