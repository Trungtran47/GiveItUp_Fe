import { combineReducers } from "redux";
// import LanguageSwitcher from '@spo/redux/language-switcher/reducer';
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
const rootReducer = combineReducers({
  // LanguageSwitcher,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
