import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
	unstable_createMuiStrictModeTheme as createMuiTheme,
	ThemeProvider,
} from '@material-ui/core';
import './index.css';
import App from './App';
import authReducer from './store/reducers/auth';
import bookReducer from './store/reducers/book';
import tagReducer from './store/reducers/tag';
import { watchAuth, watchBook, watchTag } from './store/sagas/index';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
	auth: authReducer,
	books: bookReducer,
	tags: tagReducer,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBook);
sagaMiddleware.run(watchTag);

//TODO: Generate theme with CSS variables for all components that depend on elements sizes like Drawer or AppBar.
const theme = createMuiTheme({
	palette: {
		primary: {
			// main: '#1E3462',
			main: '#00BAFF',
		},
		type: 'dark',
	},
	drawer: {
		width: 200,
	},
});

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
