import React from 'react';
import { makeStyles } from '@material-ui/core';

const Main = (props) => {
	const useStyles = makeStyles((theme) => ({
		img: {
			backgroundImage: `url(${process.env.PUBLIC_URL + '/img/background.jpg'})`,
			backgroundSize: 'cover',
			backgroundPosition: `center center`,
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
			height: '93vh',
			width: '100vw',
			[theme.breakpoints.down('xs')]: {
				height: '93.8vh',
			},
		},
	}));
	const classes = useStyles();

	return <div className={classes.img}></div>;
};

export default Main;
