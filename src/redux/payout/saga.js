import payOutFactory from "@/redux/payout/factory";
import {
  getDataPayoutRequests,
  getDataPayoutRequestsSuccess,
} from "@/redux/payout/reducer";
import { all, call, put, takeLatest } from "redux-saga/effects";

function* getAllPayoutRequestsSaga({ payload = {} }) {
  const { onSuccess, onError, query } = payload;
  try {
    const response = yield call(() =>
      payOutFactory.getAllPayoutRequests(query)
    );
    if (response?.code == 200) {
      yield put(getDataPayoutRequestsSuccess(response?.result));
      onSuccess && onSuccess();
    } else {
      onError && onError(response?.result?.message);
    }
  } catch (error) {
    if (onError) onError("xxxx");
  }
}
export function* payoutRequestsSaga() {
  yield all([takeLatest(getDataPayoutRequests.type, getAllPayoutRequestsSaga)]);
}
