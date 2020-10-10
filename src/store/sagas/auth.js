import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import database from '../../axios-database';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
	yield localStorage.removeItem('idToken');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	let authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
		isSignup: action.isSignup,
	};
	const url = `${process.env.REACT_APP_SERVER_URL}/auth`;
	if (action.username.includes('@')) {
		authData = {
			email: action.username,
			password: action.password,
			returnSecureToken: true,
			isSignup: action.isSignup,
		};
	} else if (action.email === '') {
		let userEmail = null;
		try {
			const databaseCall = yield database.get('/users.json');
			for (let key in databaseCall.data) {
				if (databaseCall.data[key].username === action.username) {
					userEmail = databaseCall.data[key].email;
				}
			}
			authData = {
				email: userEmail,
				password: action.password,
				returnSecureToken: true,
				isSignup: action.isSignup,
			};
		} catch (error) {
			return;
		}
	}

	try {
		const response = yield axios.post(url, authData);
		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem('idToken', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		yield put(
			actions.authSuccess(response.data.idToken, response.data.localId)
		);
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(actions.authFail(error.response.data.error));
	}
}

export function* authCheckStateSaga() {
	const token = yield localStorage.getItem('idToken');
	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = yield new Date(
			localStorage.getItem('expirationDate')
		);
		if (expirationDate > new Date()) {
			const userId = yield localStorage.getItem('userId');
			yield put(actions.authSuccess(token, userId));
			yield put(
				actions.checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				)
			);
		} else {
			yield put(actions.logout());
		}
	}
}

export function* authCheckUsernameAvailabilitySaga(action) {
	try {
		const response = yield database.get('/users.json');
		let valid = true;
		for (let key in response.data) {
			if (response.data[key].username === action.username) {
				valid = false;
			}
		}
		yield put(actions.setUsernameAvailability(valid));
	} catch (error) {
		return;
	}
}
