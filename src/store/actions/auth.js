import * as actionTypes from './actionTypes';

export const login = (email, password) => {
	return {
		type: actionTypes.LOGIN,
		email: email,
		password: password,
	};
};

export const loginStart = () => {
	return {
		type: actionTypes.LOGIN_START,
	};
};

export const loginSuccess = (username, email, token, userId, avatar) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		username: username,
		email: email,
		idToken: token,
		userId: userId,
		avatar: avatar,
	};
};

export const loginFail = (error) => {
	return {
		type: actionTypes.LOGIN_FAIL,
		error: error,
	};
};

export const signup = (email, password) => {
	return {
		type: actionTypes.SIGNUP,
		email: email,
		password: password,
	};
};

export const signupStart = () => {
	return {
		type: actionTypes.SIGNUP_START,
	};
};

export const signupSuccess = (username, email, token, userId, avatar) => {
	return {
		type: actionTypes.SIGNUP_SUCCESS,
		username: username,
		email: email,
		idToken: token,
		userId: userId,
		avatar: avatar,
	};
};

export const signupFail = (error) => {
	return {
		type: actionTypes.SIGNUP_FAIL,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT,
	};
};

export const logoutSucceed = () => {
	return {
		type: actionTypes.LOGOUT_SUCCESS,
	};
};

export const autoLogin = () => {
	return {
		type: actionTypes.AUTO_LOGIN,
	};
};
