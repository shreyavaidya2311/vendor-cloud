import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./error/errorReducer";
import sortReducer from "./sort/sortReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  sort: sortReducer,
});
