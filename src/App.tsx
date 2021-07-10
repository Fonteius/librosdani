import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Toolbar } from '@material-ui/core';
import { isAuthenticatedSelector } from 'src/store/rootSelector';
import Layout from 'src/hoc/Layout/Layout';
import Login from 'src/containers/Auth/Login';
import Signup from 'src/containers/Auth/Signup';
import Books from 'src/containers/Books/Books';
import Publish from 'src/containers/Books/Publish/Publish';
import Contact from 'src/containers/Main/Contact/Contact';
import * as actions from 'src/store/actions/index';

const User = lazy(() => import('src/containers/User/User'));
const Logout = lazy(() => import('src/containers/Auth/Logout/Logout'));
const Book = lazy(() => import('src/containers/Books/Book/Book'));

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(isAuthenticatedSelector);
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
				{!isAuthenticated ? <Route path='/signup' component={Signup} /> : null}
				{!isAuthenticated ? <Route path='/login' component={Login} /> : null}
				{isAuthenticated ? <Route path='/logout' component={Logout} /> : null}
				{isAuthenticated ? <Route path='/user' component={User} /> : null}
				{isAuthenticated ? <Route path='/publish' component={Publish} /> : null}
				<Route path='/book/:bookId/:title?' component={Book} />
				<Route path='/books' component={Books} />
				<Route path='/contact' component={Contact} />
				<Redirect to='/books' />
			</Switch>
		</Suspense>
	);

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
