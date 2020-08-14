import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./error/errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
