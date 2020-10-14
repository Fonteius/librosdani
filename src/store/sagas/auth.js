import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import database from '../../axios-database';
import * as actions from '../actions/index';

const serverUrl = process.env.REACT_APP_SERVER_URL;

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
		const response = yield axios.post(serverUrl + '/auth', authData);
		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem('idToken', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		const userData = yield axios.post(serverUrl + '/user', {
			idToken: response.data.idToken,
		});
		yield put(
			actions.authSuccess(
				userData.data.users[0].displayName,
				userData.data.users[0].email,
				response.data.idToken,
				response.data.localId,
				userData.data.users[0].photoUrl
			)
		);
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(actions.authFail(error));
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
			const userData = yield axios.post(serverUrl + '/user', {
				idToken: token,
			});
			yield put(
				actions.authSuccess(
					userData.data.users[0].displayName,
					userData.data.users[0].email,
					token,
					userId,
					userData.data.users[0].photoUrl
				)
			);
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
