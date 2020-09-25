// Redux
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

// Sagas
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
export const AUTH_CHECK_USERNAME_AVAILABILITY =
	'AUTH_CHECK_USERNAME_AVAILABILITY';
export const SET_USERNAME_AVAILABILITY = 'SET_USERNAME_AVAILABILITY';

//------------------

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_START = 'FETCH_BOOKS_START';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAIL = 'FETCH_BOOKS_FAIL';

export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_BOOK_START = 'FETCH_BOOK_START';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAIL = 'FETCH_BOOK_FAIL';

export const INIT_BOOK = 'INIT_BOOK';
export const SET_BOOK = 'SET_BOOK';

export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOK_START = 'ADD_BOOK_START';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAIL = 'ADD_BOOK_FAIL';

export const UPDATE_BOOK = 'UPDATE_BOOK';
export const UPDATE_BOOK_START = 'UPDATE_BOOK_START';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAIL = 'UPDATE_BOOK_FAIL';

export const REMOVE_BOOK = 'REMOVE_BOOK';
export const REMOVE_BOOK_START = 'REMOVE_BOOK_START';
export const REMOVE_BOOK_SUCCESS = 'REMOVE_BOOK_SUCCESS';
export const REMOVE_BOOK_FAIL = 'REMOVE_BOOK_FAIL';