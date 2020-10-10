import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	makeStyles,
	Typography,
	IconButton,
} from '@material-ui/core';
import { Menu, AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		color: 'black',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#fff !important',
		boxShadow: '0 0 0 1px #263238',
	},
	title: {
		flexGrow: 1,
		color: 'green',
		textDecoration: 'none',
	},
	menuButton: {
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	buttons: {
		color: 'black',
		textDecoration: 'none',
	},
	icons: {
		color: 'green',
	},
}));

const MainMenu = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const classes = useStyles();

	let navLinks = (
		<React.Fragment>
			<Typography component={NavLink} to='/auth' className={classes.buttons}>
				Login
			</Typography>
		</React.Fragment>
	);
	if (isAuthenticated) {
		navLinks = (
			<React.Fragment>
				<AccountCircle className={classes.icons} />
				<Typography
					component={NavLink}
					to='/logout'
					className={classes.buttons}
				>
					Log Out
				</Typography>
			</React.Fragment>
		);
	}

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='primary'
						className={classes.menuButton}
						onClick={props.toggleDrawer}
					>
						<Menu />
					</IconButton>
					<Typography
						variant='h6'
						component={NavLink}
						to='/'
						className={classes.title}
					>
						Libros Dani
					</Typography>
					{navLinks}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default MainMenu;
