import { SET_CATEGORY } from "./sortActionTypes";

export const setCategory = (category) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY,
    payload: category,
  });
};
