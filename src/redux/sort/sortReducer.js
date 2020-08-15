import { SET_CATEGORY, IS_LOADING } from "./sortActionTypes";

const initialState = {
  category: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
