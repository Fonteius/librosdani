import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import bookReducer from './reducers/book';
import tagReducer from './reducers/tag';

const rootReducer = combineReducers({
	auth: authReducer,
	books: bookReducer,
	tags: tagReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;