import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "@redux-saga/core";
import pollReducer from './pollSlice'
import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: pollReducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;