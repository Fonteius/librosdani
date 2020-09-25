import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));
const PublishForm = lazy(() =>
	import('./containers/Books/PublishForm/PublishForm')
);
const Results = lazy(() => import('./containers/Books/Results/Results'));
const Book = lazy(() => import('./containers/Books/Book/Book'));

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
				<Route path='/auth' component={Auth} />
				<Route path='/book/:bookId/:title' component={Book} />
				<Route path='/books' component={Results} />
				<Route path='/' exact />
				<Redirect to='/' />
			</Switch>
		</Suspense>
	);

	if (isAuthenticated) {
		routes = (
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path='/logout' component={Logout} />
					<Route path='/auth' component={Auth} />
					<Route path='/publish' component={PublishForm} />
					<Route path='/book/:bookId/:title' component={Book} />
					<Route path='/books' component={Results} />
					<Route path='/' exact />
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
