
import { all } from "redux-saga/effects";
import { watchAddUser } from "./pollSaga";

export default function* rootSaga() {
    yield all([
        watchAddUser(),
    ])
}