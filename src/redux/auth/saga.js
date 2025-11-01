import { getDataUser } from "@/redux/user/reducer";
import Cookies from "js-cookie";
import { all, call, put, takeLatest } from "redux-saga/effects";
import authFactory from "./factory";
import { logout, LOGOUT_FAILURE, LOGOUT_SUCCESS, signIn } from "./reducer";
function saveTokenToCookies(token, expires) {
  const expireDays = expires / (24 * 60 * 60); // đổi giây → ngày
  Cookies.set(
    "user",
    JSON.stringify({
      Token: token,
      Expires: expires,
    }),
    {
      expires: expireDays,
      path: "/",
      sameSite: "Lax",
    }
  );
}

function* signInSaga({ payload }) {
  const { data, onSuccess, onError } = payload;
  try {
    const response = yield call(() => authFactory.requestSignIn(data));
    if (response?.code === 200 && response?.result?.authenticated) {
      const token = response?.result?.token;
      const expires = response?.result?.expires;
      if (token) {
        saveTokenToCookies(token, expires);
        yield put(getDataUser());
      }
      onSuccess && onSuccess(token);
    } else {
      onError && onError(response?.result?.message);
    }
  } catch (error) {
    if (onError) onError("xxxx");
  }
}
// Refresh Token Saga
function* refreshTokenSaga({ payload }) {
  try {
    const response = yield call(() => authFactory.refreshToken(payload));
    if (response?.code === 0) {
      yield put(REFRESH_SUCCESS({ token: response.result.token }));
    } else {
      yield put(REFRESH_FAILURE(response.message));
    }
  } catch (error) {
    yield put(REFRESH_FAILURE(error.message));
  }
}

// Introspect Token Saga
function* introspectTokenSaga({ payload }) {
  try {
    const response = yield call(() => authFactory.introspectToken(payload));
    if (response?.code === 0) {
      yield put(INTROSPECT_SUCCESS(response.result));
    } else {
      yield put(INTROSPECT_FAILURE(response.message));
    }
  } catch (error) {
    yield put(INTROSPECT_FAILURE(error.message));
  }
}

// Logout Saga
function* logoutSaga({ payload }) {
  try {
    const { data, onSuccess, onError } = payload;
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    console.log("Logging out user:", user);
    if (user?.Token) {
      const response = yield call(() => authFactory.logout(user?.Token));
      if (response?.code === 200) {
        Cookies.remove("user", { path: "/" });
        yield put(LOGOUT_SUCCESS());
        onSuccess && onSuccess();
      }
    }
  } catch (error) {
    yield put(LOGOUT_FAILURE(error.message));
  }
}

export function* authSaga() {
  yield all([
    takeLatest(signIn.type, signInSaga),
    takeLatest(logout.type, logoutSaga),
  ]);
}
