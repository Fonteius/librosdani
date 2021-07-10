import { all, fork, takeEvery } from "redux-saga/effects";
import * as actionTypes from './actions/actionTypes';
import { loginSaga, signupSaga, logoutSaga, autoLoginSaga } from './sagas/auth';
import {
	publishBookSaga,
	updateBookSaga,
	removeBookSaga,
	fetchBooksSaga,
	fetchBookSaga,
} from './sagas/book';
import { fetchTagsSaga } from './sagas/tag';

function* watchAuth() {
	yield all([
		takeEvery(actionTypes.LOGIN, loginSaga),
		takeEvery(actionTypes.SIGNUP, signupSaga),
		takeEvery(actionTypes.LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTO_LOGIN, autoLoginSaga),
	]);
}

function* watchBook() {
	yield takeEvery(actionTypes.ADD_BOOK, publishBookSaga);
	yield takeEvery(actionTypes.UPDATE_BOOK, updateBookSaga);
	yield takeEvery(actionTypes.REMOVE_BOOK, removeBookSaga);
	yield takeEvery(actionTypes.FETCH_BOOKS, fetchBooksSaga);
	yield takeEvery(actionTypes.FETCH_BOOK, fetchBookSaga);
}

function* watchTag() {
	yield takeEvery(actionTypes.FETCH_TAGS, fetchTagsSaga);
}


export function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchBook),
    fork(watchTag)
  ]);
}