import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAllPosts, getDataPosts, getDataPostsSuccess } from "./reducer";
import postFactory from "@/redux/post/factory";

function* getPostsSaga({ payload = {} }) {
  const { onSuccess, onError, query } = payload;
  try {
    const response = yield call(() => postFactory.getPosts(query));
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
  yield all([
    takeLatest(getDataPosts.type, getPostsSaga),
    takeLatest(getAllPosts.type, getAllPostsSaga),
  ]);
}
