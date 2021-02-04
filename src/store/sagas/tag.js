import { put } from 'redux-saga/effects';
import database from '../../axios-database';
import * as actions from '../actions/index';

export function* fetchTagsSaga() {
	yield put(actions.fetchTagsStart());
	try {
		const response = yield database.get(`/tags.json`);
		const tags = [];
		for (let key in response.data) {
			tags.push({
				title: response.data[key],
				id: key,
			});
		}
		yield put(actions.fetchTagsSuccess(tags));
	} catch (error) {
		yield put(actions.fetchTagsFail(error));
	}
}
