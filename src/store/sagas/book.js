import { put } from 'redux-saga/effects';
import axios from '../../axios-database';
import * as actions from '../actions/index';

export function* publishBookSaga(action) {
	yield put(actions.addBookStart());
	try {
		const images = yield publishPicturesSaga(action.bookData.pictures);
		const book = yield {
			...action.bookData,
			pictures: [...images],
		};
		const response = yield axios.post(
			`/books.json?auth=${action.idToken}`,
			book
		);
		yield put(actions.addBookSuccess(response.data.name, book));
		yield put(actions.fetchBooks());
	} catch (error) {
		yield put(actions.addBookFail(error));
	}
}

export function* publishPicturesSaga(files) {
	const url = 'http://localhost:3001/';
	let picturesUrl = [];
	let picture = {};
	let formData;
	let response;
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};
	for (let i = 0; i < files.length; i++) {
		formData = yield new FormData();
		const base64 = yield toBase64(files[i]);
		yield formData.append('file', base64);
		yield formData.append('name', files[i].name);
		response = yield axios.post(url, formData, config);
		yield (picture = {
			id: response.data.imgId,
			name: response.data.title,
			image: response.data.url,
			medium: response.data.medium.url,
			thumb: response.data.thumb.url,
		});
		yield picturesUrl.push(picture);
	}
	return picturesUrl;
}

const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export function* updateBookSaga(action) {
	yield put(actions.updateBookStart());
	try {
		yield axios.patch(`/books/${action.bookId}.json`, action.bookData);
		yield put(actions.updateBookSuccess(action.bookId, action.bookData));
		yield put(actions.fetchBooks());
	} catch (error) {
		yield put(actions.updateBookFail(error));
	}
}

export function* removeBookSaga(action) {
	yield put(actions.removeBookStart());
	try {
		yield axios.delete(`/books/${action.bookId}.json`);
		yield put(actions.removeBookSuccess(action.bookId));
		yield put(actions.fetchBooks());
	} catch (error) {
		yield put(actions.removeBookFail(error));
	}
}

export function* fetchBooksSaga(action) {
	yield put(actions.fetchBooksStart());
	const query = action.query ? `?${action.query}` : '';
	try {
		const response = yield axios.get(`/books.json${query}`);
		const books = [];
		for (let key in response.data) {
			books.push({
				...response.data[key],
				id: key,
			});
		}
		yield put(actions.fetchBooksSuccess(books));
	} catch (error) {
		yield put(actions.fetchBooksFail(error));
	}
}

export function* fetchBookSaga(action) {
	yield put(actions.fetchBookStart());
	try {
		const response = yield axios.get(`/books/${action.id}.json`);
		let book = null;
		response.data !== null ? (book = response.data) : (book = false);
		yield put(actions.fetchBookSuccess(book));
	} catch (error) {
		yield put(actions.fetchBookFail(error));
	}
}
