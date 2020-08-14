import { GET_ERRORS } from "../auth/authActionTypes";

const initalState = {};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
