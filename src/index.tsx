import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import {
	unstable_createMuiStrictModeTheme as createMuiTheme,
	ThemeProvider,
	Theme
} from '@material-ui/core';
import 'src/index.css';
import store from 'src/store'
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';

interface IDrawer extends Theme {
	drawer: {
		width: number;
	}
}

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
} as IDrawer);

ReactDOM.render(
	<StrictMode>
		<ReduxProvider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</ReduxProvider>
	</StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
