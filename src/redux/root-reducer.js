import { combineReducers } from "redux";
// import LanguageSwitcher from '@spo/redux/language-switcher/reducer';
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import categoryReducer from "./category/reducer";
import postReducer from "./post/reducer";
import payoutReducer from "./payout/reducer";
const rootReducer = combineReducers({
  // LanguageSwitcher,
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  post: postReducer,
  payout: payoutReducer,
});

export default rootReducer;
