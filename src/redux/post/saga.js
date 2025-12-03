import { all, call, put, takeLatest } from "redux-saga/effects";
import { getDataPosts, getDataPostsSuccess } from "./reducer";
import postFactory from "@/redux/post/factory";

function* getAllPostsSaga({ payload = {} }) {
  const { onSuccess, onError, query } = payload;
  try {
    const response = yield call(() => postFactory.getAllPosts(query));
    if (response?.code == 200) {
      yield put(getDataPostsSuccess(response?.result));
      onSuccess && onSuccess();
    } else {
      onError && onError(response?.result?.message);
    }
  } catch (error) {
    if (onError) onError("xxxx");
  }
}
export function* postSaga() {
  yield all([takeLatest(getDataPosts.type, getAllPostsSaga)]);
}
