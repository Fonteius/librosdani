import * as actionTypes from './actionTypes';

// Redux
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (username, email, token, userId, avatar) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		username: username,
		email: email,
		idToken: token,
		userId: userId,
		avatar: avatar,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logoutSucceed = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const setUsernameAvailability = (available) => {
	return {
		type: actionTypes.SET_USERNAME_AVAILABILITY,
		available: available,
	};
};

// Sagas
export const logout = () => {
	return {
		type: actionTypes.AUTH_INITIATE_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationTime: expirationTime,
	};
};

export const auth = (username, email, password, isSignup) => {
	return {
		type: actionTypes.AUTH_USER,
		username: username,
		email: email,
		password: password,
		isSignup: isSignup,
	};
};

export const authCheckState = () => {
	return {
		type: actionTypes.AUTH_CHECK_STATE,
	};
};

export const authCheckUsernameAvailability = (username) => {
	return {
		type: actionTypes.AUTH_CHECK_USERNAME_AVAILABILITY,
		username: username,
	};
};

// ----------------------------- REPLACEMENT --------

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
