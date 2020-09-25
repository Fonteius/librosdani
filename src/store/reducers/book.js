import * as actionTypes from '../actions/actionTypes';

const initialState = {
	books: [],
	loading: false,
	error: null,
	book: null,
};

// const bookData = {
// 	id: null,
// 	title: null,
// 	author: null,
// 	price: null,
// 	editorial: null,
// 	year: null,
// 	pictures: [],
// };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_BOOK_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ADD_BOOK_SUCCESS:
			const newBook = {
				...action.bookData,
				id: action.bookId,
			};
			return {
				...state,
				loading: false,
				books: state.books.concat(newBook),
			};
		case actionTypes.ADD_BOOK_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case actionTypes.UPDATE_BOOK_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.UPDATE_BOOK_SUCCESS:
			const updatedBookIndex = state.books
				.map((item) => item.id)
				.indexOf(action.bookId);
			const oldBook = state.books[updatedBookIndex];
			const updatedBook = {
				...oldBook,
				...action.bookData,
			};
			return {
				...state,
				loading: false,
				books: [
					...state.books,
					(state.books[updatedBookIndex] = {
						...updatedBook,
					}),
				],
			};
		case actionTypes.UPDATE_BOOK_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case actionTypes.REMOVE_BOOK_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.REMOVE_BOOK_SUCCESS:
			return {
				...state,
				loading: false,
				books: state.books.filter((book) => book.id !== action.bookId),
			};
		case actionTypes.REMOVE_BOOK_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case actionTypes.FETCH_BOOKS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_BOOKS_SUCCESS:
			return {
				...state,
				loading: false,
				books: action.books,
			};
		case actionTypes.FETCH_BOOKS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case actionTypes.FETCH_BOOK_START:
			return {
				...state,
				loading: true,
				book: null,
			};
		case actionTypes.FETCH_BOOK_SUCCESS:
			return {
				...state,
				loading: false,
				book: action.book,
			};
		case actionTypes.FETCH_BOOK_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				book: null,
			};
		default:
			return state;
	}
};

export default reducer;
