import * as actionTypes from './actionTypes';

export const fetchTags = (query = null) => {
	return {
		type: actionTypes.FETCH_TAGS,
	};
};

export const fetchTagsStart = () => {
	return {
		type: actionTypes.FETCH_TAGS_START,
	};
};

export const fetchTagsSuccess = (tags) => {
	return {
		type: actionTypes.FETCH_TAGS_SUCCESS,
		tags: tags,
	};
};

export const fetchTagsFail = (error) => {
	return {
		type: actionTypes.FETCH_TAGS_FAIL,
		error: error,
	};
};
