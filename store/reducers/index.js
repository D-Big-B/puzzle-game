import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { gameReducer } from "./gameReducers";

export default combineReducers({
  auth: authReducer,
  gameInfo: gameReducer,
});
