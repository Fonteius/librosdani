import { put } from 'redux-saga/effects';
import axios from 'axios';
import database from '../../axios-database';
import Resizer from 'react-image-file-resizer';
import * as actions from '../actions/index';

export function* publishBookSaga(action) {
	yield put(actions.addBookStart());
	try {
		const images = yield publishPicturesSaga(action.bookData.pictures);
		const date = new Date().getTime();
		const book = yield {
			...action.bookData,
			pictures: [...images],
			creationDate: date,
			updateDate: date,
			endDate: null,
			tags: [],
			status: 'active',
		};
		const authParam = action.idToken;
		const response = yield database.post('/books.json', book, {
			params: {
				auth: authParam,
			},
		});
		yield put(actions.addBookSuccess(response.data.name, book));
		yield put(actions.fetchBooks());
	} catch (error) {
		yield put(actions.addBookFail(error));
	}
}

export function* publishPicturesSaga(files) {
	const url = `${process.env.REACT_APP_SERVER_URL}/upload`;
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
		let base64 = null;
		if (files[i].size > 200000) {
			base64 = yield resizeImage(files[i]);
		} else {
			base64 = yield toBase64(files[i]);
		}
		yield formData.append('file', base64);
		yield formData.append('name', files[i].name);
		response = yield axios.post(url, formData, config);
		let medium = null;
		if (response.data.medium !== undefined) {
			medium = response.data.medium.url;
		}
		yield (picture = {
			id: response.data.imgId,
			name: response.data.title,
			image: response.data.url,
			medium: medium,
			thumb: response.data.thumb.url,
		});
		yield picturesUrl.push(picture);
	}
	return picturesUrl;
}

const resizeImage = (image) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			image,
			1920,
			1080,
			'JPEG',
			60,
			0,
			(uri) => {
				resolve(uri);
			},
			'base64'
		);
	});

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
		yield database.patch(`/books/${action.bookId}.json`, action.bookData);
		yield put(actions.updateBookSuccess(action.bookId, action.bookData));
		yield put(actions.fetchBooks());
	} catch (error) {
		yield put(actions.updateBookFail(error));
	}
}

export function* removeBookSaga(action) {
	yield put(actions.removeBookStart());
	try {
		yield database.delete(`/books/${action.bookId}.json`);
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
		const response = yield database.get(`/books.json${query}`);
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
		const response = yield database.get(`/books/${action.id}.json`);
		let book = null;
		response.data !== null ? (book = response.data) : (book = false);
		yield put(actions.fetchBookSuccess(book));
	} catch (error) {
		yield put(actions.fetchBookFail(error));
	}
}
