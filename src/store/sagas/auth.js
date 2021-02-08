import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function* loginSaga(action) {
	yield put(actions.loginStart());
	const loginData = {
		email: action.email,
		password: action.password,
	};
	try {
		const response = yield axios.post(serverUrl + '/login', loginData);
		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem('idToken', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		const userData = {
			idToken: response.data.idToken,
		};
		const user = yield axios.post(serverUrl + '/user', userData);
		yield put(
			actions.loginSuccess(
				response.data.displayName,
				response.data.email,
				response.data.idToken,
				response.data.localId,
				user.data.users[0].photoUrl
			)
		);
		yield delay(response.data.expiresIn * 1000);
		yield put(actions.logout());
	} catch (error) {
		yield put(actions.loginFail(error.response.data));
	}
}

export function* signupSaga(action) {
	yield put(actions.signupStart());
	const signupData = {
		email: action.email,
		password: action.password,
	};
	try {
		const response = yield axios.post(serverUrl + '/signup', signupData);
		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem('idToken', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		yield put(
			actions.signupSuccess(
				null,
				response.data.email,
				response.data.idToken,
				response.data.localId,
				null
			)
		);
		yield delay(response.data.expiresIn * 1000);
		yield put(actions.logout());
	} catch (error) {
		yield put(actions.signupFail(error.response.data));
	}
}

export function* logoutSaga(action) {
	yield localStorage.removeItem('idToken');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed());
}

export function* autoLoginSaga() {
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
				actions.loginSuccess(
					userData.data.users[0].displayName,
					userData.data.users[0].email,
					token,
					userId,
					userData.data.users[0].photoUrl
				)
			);
			const expirationTime = expirationDate.getTime() - new Date().getTime();
			yield delay(expirationTime);
			yield put(actions.logout());
		} else {
			yield put(actions.logout());
		}
	}
}
