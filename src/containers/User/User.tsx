import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isAuthenticatedSelector } from 'src/store/rootSelector';
import { makeStyles } from '@material-ui/core';

const User = () => {
	const useStyles = makeStyles((theme) => ({
		example: {
			marginLeft: '250px',
			marginTop: '70px',
		},
	}));

	const classes = useStyles();
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	const history = useHistory();

	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/');
		}
	}, [isAuthenticated, history]);

	const content = (
		<p className={classes.example}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum est
			ut repellat vel architecto. Beatae quasi magni voluptas quis blanditiis
			quo dolorem velit enim ad fugiat, culpa nulla esse.
		</p>
	);
	return <div>{isAuthenticated ? content : null}</div>;
};

export default User;
