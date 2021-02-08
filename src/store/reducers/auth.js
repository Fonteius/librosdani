import * as actionTypes from '../actions/actionTypes';

const initialState = {
	username: null,
	email: null,
	idToken: null,
	userId: null,
	avatar: null,
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_START:
			return {
				...state,
				error: null,
				loading: true,
			};
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				username: action.username,
				email: action.email,
				idToken: action.idToken,
				userId: action.userId,
				avatar: action.avatar,
				error: null,
				loading: false,
			};
		case actionTypes.LOGIN_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case actionTypes.SIGNUP_START:
			return {
				...state,
				error: null,
				loading: true,
			};
		case actionTypes.SIGNUP_SUCCESS:
			return {
				...state,
				username: action.username,
				email: action.email,
				idToken: action.idToken,
				userId: action.userId,
				avatar: action.avatar,
				error: null,
				loading: false,
			};
		case actionTypes.SIGNUP_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case actionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				username: null,
				email: null,
				idToken: null,
				userId: null,
				avatar: null,
			};
		default:
			return state;
	}
};

export default reducer;
