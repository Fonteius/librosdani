import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const Main = lazy(() => import('./containers/Main/Main'));

const User = lazy(() => import('./containers/User/User'));
const Login = lazy(() => import('./containers/Auth/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

const Results = lazy(() => import('./containers/Books/Results/Results'));
const Book = lazy(() => import('./containers/Books/Book/Book'));
const Publish = lazy(() => import('./containers/Books/Publish/Publish'));

const App = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const onTryAutoSignup = useCallback(
		() => dispatch(actions.authCheckState()),
		[dispatch]
	);

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/book/:bookId/:title' component={Book} />
				<Route path='/books' component={Results} />
				<Route path='/' exact component={Main} />
				<Redirect to='/' />
			</Switch>
		</Suspense>
	);

	if (isAuthenticated) {
		routes = (
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path='/logout' component={Logout} />
					<Route path='/user' component={User} />
					<Route path='/publish' component={Publish} />
					<Route path='/book/:bookId/:title' component={Book} />
					<Route path='/books' component={Results} />
					<Route path='/' exact component={Main} />
					<Redirect to='/' />
				</Switch>
			</Suspense>
		);
	}

	return (
		<div>
			<Layout>{routes}</Layout>
		</div>
	);
};

export default App;
