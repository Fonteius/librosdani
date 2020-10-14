import React from 'react';
import { makeStyles /*useTheme*/ } from '@material-ui/core';

const Main = (props) => {
	// const theme = useTheme();
	// const drawerWidth = theme.drawer.width;
	const useStyles = makeStyles((theme) => ({
		img: {
			backgroundImage: `url(${process.env.PUBLIC_URL + '/img/background.jpg'})`,
			backgroundSize: 'cover',
			height: '100vh',
			width: '100vw',
			margin: 0,
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.img}>
			{/* <img
				src={process.env.PUBLIC_URL + '/img/background.jpg'}
				alt=''
				className={classes.img}
			/> */}
		</div>
	);
};

export default Main;
