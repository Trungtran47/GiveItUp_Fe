import { all, call, put, takeLatest } from "redux-saga/effects";
import { default as categoryFactory } from "./factory";
import { getDataCategories, getDataCategoriesSuccess } from "./reducer";
// function* registerUserSaga({ payload = {} }) {
//   const { onSuccess, onError, data } = payload;
//   try {
//     const response = yield call(() => userFactory.registerUser(data));
//     if (response?.code === 200) {
//       const dataSignIn = { username: data?.username, password: data?.password };
//       yield put(
//         signIn({
//           data: dataSignIn,
//           onSuccess: (token) => {
//             onSuccess && onSuccess(token); // callback gốc của registerUserSaga
//           },
//           onError: (err) => {
//             console.error("Đăng nhập tự động lỗi:", err);
//             onError && onError(err);
//           },
//         })
//       );
//       yield put(registerSuccess());
//     }
//   } catch (error) {
//     onError && onError(error?.response?.data);
//     // if (onError) onError("xxxx");
//   }
// }
// function* getDataUserSaga({ payload = {} }) {
//   const { onSuccess, onError } = payload;

//   try {
//     const response = yield call(() => userFactory.getDataUser());
//     if (response?.code === 200) {
//       yield put(getDataUserSuccess(response?.result));
//       onSuccess && onSuccess(response);
//     } else {
//       onError && onError(response?.result?.message);
//     }
//   } catch (error) {
//     if (onError) onError("xxxx");
//   }
// }
function* getAllCategoriesSaga({ payload = {} }) {
  const { onSuccess, onError, query } = payload;
  try {
    const response = yield call(() => categoryFactory.getAllCategories(query));
    if (response?.code === 200) {
      yield put(getDataCategoriesSuccess(response?.result));
      onSuccess && onSuccess();
    } else {
      onError && onError(response?.result?.message);
    }
  } catch (error) {
    if (onError) onError("xxxx");
  }
}
export function* categorySaga() {
  yield all([
    // takeLatest(getDataCategory.type, getDataCategorySaga),
    // takeLatest(registerUser.type, registerUserSaga),
    takeLatest(getDataCategories.type, getAllCategoriesSaga),
  ]);
}
