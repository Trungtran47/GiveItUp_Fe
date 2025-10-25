import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer'; // Reducers của bạn
import rootSaga from './root-saga'; // Root Saga của bạn

const sagaMiddleware = createSagaMiddleware();

export function makeStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: false,
            }).concat(sagaMiddleware),
    });

    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}
