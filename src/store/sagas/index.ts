import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { loginSaga, signupSaga, logoutSaga, autoLoginSaga } from './auth';
import {
	publishBookSaga,
	updateBookSaga,
	removeBookSaga,
	fetchBooksSaga,
	fetchBookSaga,
} from './book';

import { fetchTagsSaga } from './tag';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.LOGIN, loginSaga),
		takeEvery(actionTypes.SIGNUP, signupSaga),
		takeEvery(actionTypes.LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTO_LOGIN, autoLoginSaga),
	]);
}

export function* watchBook() {
	yield takeEvery(actionTypes.ADD_BOOK, publishBookSaga);
	yield takeEvery(actionTypes.UPDATE_BOOK, updateBookSaga);
	yield takeEvery(actionTypes.REMOVE_BOOK, removeBookSaga);
	yield takeEvery(actionTypes.FETCH_BOOKS, fetchBooksSaga);
	yield takeEvery(actionTypes.FETCH_BOOK, fetchBookSaga);
}

export function* watchTag() {
	yield takeEvery(actionTypes.FETCH_TAGS, fetchTagsSaga);
}
