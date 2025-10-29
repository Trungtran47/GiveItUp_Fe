import { all } from "redux-saga/effects";
import { authSaga } from "./auth/saga";
import { userSaga } from "@/redux/user/saga";
import { categorySaga } from "@/redux/category/saga";

export default function* rootSaga(getState) {
  yield all([authSaga(), userSaga(), categorySaga()]);
}
