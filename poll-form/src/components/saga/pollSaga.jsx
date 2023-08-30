import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { resetPoll, savePollResultSuccess } from '../store/pollSlice';

export function* watchAddUser() {
    yield takeEvery('PUT_POLL_RESULT', putPollResult);
    // yield takeEvery('poll/savePollResult', putPollResult);
}

function* putPollResult(action) {
    try {
        console.log("action put", action)
        const data = action.payload;
        const res = yield call(
            axios.post,
            "https://poll-http-default-rtdb.firebaseio.com/pollResult.json",
            data
        );
        console.log(res);
        yield put(savePollResultSuccess(JSON.parse(res.config.data)));
    } catch (e) {
        console.log('error', e)
    } finally {
        yield put(resetPoll())
    }
}

