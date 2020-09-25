import * as actionTypes from './actionTypes';

export const fetchBooks = (query = null) => {
	return {
		type: actionTypes.FETCH_BOOKS,
		query: query,
	};
};

export const fetchBooksStart = () => {
	return {
		type: actionTypes.FETCH_BOOKS_START,
	};
};

export const fetchBooksSuccess = (books) => {
	return {
		type: actionTypes.FETCH_BOOKS_SUCCESS,
		books: books,
	};
};

export const fetchBooksFail = (error) => {
	return {
		type: actionTypes.FETCH_BOOKS_FAIL,
		error: error,
	};
};

export const fetchBook = (id) => {
	return {
		type: actionTypes.FETCH_BOOK,
		id: id,
	};
};

export const fetchBookStart = () => {
	return {
		type: actionTypes.FETCH_BOOK_START,
	};
};

export const fetchBookSuccess = (book) => {
	return {
		type: actionTypes.FETCH_BOOK_SUCCESS,
		book: book,
	};
};

export const fetchBookFail = (error) => {
	return {
		type: actionTypes.FETCH_BOOK_FAIL,
		error: error,
	};
};

// -------------------------------

export const initBook = () => {
	return {
		type: actionTypes.INIT_BOOK,
	};
};

export const setBook = () => {
	return {
		type: actionTypes.SET_BOOK,
	};
};

export const addBook = (idToken, book) => {
	return {
		type: actionTypes.ADD_BOOK,
		idToken: idToken,
		bookData: book,
	};
};

export const addBookStart = () => {
	return {
		type: actionTypes.ADD_BOOK_START,
	};
};

export const addBookSuccess = (id, book) => {
	return {
		type: actionTypes.ADD_BOOK_SUCCESS,
		bookId: id,
		bookData: book,
	};
};

export const addBookFail = (error) => {
	return {
		type: actionTypes.ADD_BOOK_FAIL,
		error: error,
	};
};

export const updateBook = (id, book) => {
	return {
		type: actionTypes.UPDATE_BOOK,
		bookId: id,
		bookData: book,
	};
};

export const updateBookStart = () => {
	return {
		type: actionTypes.UPDATE_BOOK_START,
	};
};

export const updateBookSuccess = (id, book) => {
	return {
		type: actionTypes.UPDATE_BOOK_SUCCESS,
		bookId: id,
		bookData: book,
	};
};

export const updateBookFail = (error) => {
	return {
		type: actionTypes.UPDATE_BOOK_FAIL,
		error: error,
	};
};

export const removeBook = (id) => {
	return {
		type: actionTypes.REMOVE_BOOK,
		bookId: id,
	};
};

export const removeBookStart = () => {
	return {
		type: actionTypes.REMOVE_BOOK_START,
	};
};

export const removeBookSuccess = (id) => {
	return {
		type: actionTypes.REMOVE_BOOK_SUCCESS,
		bookId: id,
	};
};

export const removeBookFail = (error) => {
	return {
		type: actionTypes.REMOVE_BOOK_FAIL,
		error: error,
	};
};
