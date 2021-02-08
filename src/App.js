import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Toolbar } from '@material-ui/core';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Books from './containers/Books/Books';
import Publish from './containers/Books/Publish/Publish';
import Contact from './containers/Main/Contact/Contact';
import * as actions from './store/actions/index';

const User = lazy(() => import('./containers/User/User'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));
const Book = lazy(() => import('./containers/Books/Book/Book'));

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const onTryAutoLogin = useCallback(() => dispatch(actions.autoLogin()), [
		dispatch,
	]);

	useEffect(() => {
		onTryAutoLogin();
	}, [onTryAutoLogin]);

	// Check existence of Horizontal Scrollbar based on difference of html width and window width.
	// useEffect(() => {
	// 	let hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
	// 	console.log('Window InnerWith : ', window.innerWidth);
	// 	console.log(
	// 		'DocumentElement ClientWith : ',
	// 		document.documentElement.clientWidth
	// 	);
	// 	console.log('HasScrollBar : ', hasScrollbar);
	// }, []);

	let routes = (
		<Suspense fallback={<LinearProgress />}>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/book/:bookId/:title?' component={Book} />
				<Route path='/books' component={Books} />
				<Route path='/contact' component={Contact} />
				<Redirect to='/books' />
			</Switch>
		</Suspense>
	);

	if (isAuthenticated) {
		routes = (
			<Suspense fallback={<LinearProgress />}>
				<Switch>
					<Route path='/logout' component={Logout} />
					<Route path='/user' component={User} />
					<Route path='/publish' component={Publish} />
					<Route path='/book/:bookId/:title?' component={Book} />
					<Route path='/books' component={Books} />
					<Route path='/contact' component={Contact} />
					<Redirect to='/books' />
				</Switch>
			</Suspense>
		);
	}

	const toolbar = location.pathname !== '/' ? <Toolbar /> : null;

	return (
		<div>
			<Layout>
				{toolbar}
				{routes}
			</Layout>
		</div>
	);
};

export default App;
