import * as actionTypes from '../actions/actionTypes';

const initialState = {
	username: null,
	idToken: null,
	userId: null,
	avatar: null,
	error: null,
	loading: false,
	authRedirectPath: '/books',
	usernameAvailable: true,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true,
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				idToken: action.idToken,
				userId: action.userId,
				error: null,
				loading: false,
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				idToken: null,
				userId: null,
			};
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path,
			};
		case actionTypes.SET_USERNAME_AVAILABILITY:
			return {
				...state,
				usernameAvailable: action.available,
			};
		default:
			return state;
	}
};

export default reducer;
