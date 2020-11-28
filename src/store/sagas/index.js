import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
	loginSaga,
	signupSaga,
	logoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckStateSaga,
	authCheckUsernameAvailabilitySaga,
} from './auth';
import {
	publishBookSaga,
	updateBookSaga,
	removeBookSaga,
	fetchBooksSaga,
	fetchBookSaga,
} from './book';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.LOGIN, loginSaga),
		takeEvery(actionTypes.SIGNUP, signupSaga),
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
		takeEvery(
			actionTypes.AUTH_CHECK_USERNAME_AVAILABILITY,
			authCheckUsernameAvailabilitySaga
		),
	]);
}

export function* watchBook() {
	yield takeEvery(actionTypes.ADD_BOOK, publishBookSaga);
	yield takeEvery(actionTypes.UPDATE_BOOK, updateBookSaga);
	yield takeEvery(actionTypes.REMOVE_BOOK, removeBookSaga);
	yield takeEvery(actionTypes.FETCH_BOOKS, fetchBooksSaga);
	yield takeEvery(actionTypes.FETCH_BOOK, fetchBookSaga);
}
