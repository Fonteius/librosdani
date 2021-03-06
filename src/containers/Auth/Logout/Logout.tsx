import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from 'src/store/actions/index';

const Logout = () => {
	const dispatch = useDispatch();
	const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch]);
	useEffect(() => {
		onLogout();
	}, [onLogout]);

	return <Redirect to='/books' />;
};

export default Logout;
