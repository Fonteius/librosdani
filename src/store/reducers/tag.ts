import * as actionTypes from '../actions/actionTypes';

const initialState = {
	tags: [],
	loading: false,
	error: null,
};

const reducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionTypes.FETCH_TAGS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_TAGS_SUCCESS:
			return {
				...state,
				loading: false,
				tags: action.tags,
			};
		case actionTypes.FETCH_TAGS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
