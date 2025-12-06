import { all } from "redux-saga/effects";
import { authSaga } from "./auth/saga";
import { userSaga } from "@/redux/user/saga";
import { categorySaga } from "@/redux/category/saga";
import { postSaga } from "@/redux/post/saga";
import { payoutRequestsSaga } from "@/redux/payout/saga";
export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    userSaga(),
    categorySaga(),
    postSaga(),
    payoutRequestsSaga(),
  ]);
}
