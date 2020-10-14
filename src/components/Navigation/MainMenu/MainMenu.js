import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	makeStyles,
	Typography,
	IconButton,
	Avatar,
	Paper,
	Popper,
	Grow,
	Button,
	MenuList,
	MenuItem,
	ClickAwayListener,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

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
		marginRight: theme.spacing(2),
	},
	icons: {
		color: 'green',
	},
	avatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		marginRight: theme.spacing(1),
	},
	paper: {
		marginRight: theme.spacing(2),
	},
}));

const MainMenu = (props) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuAnchorRef = useRef();
	const prevOpen = useRef(menuOpen);
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const { username, avatar } = useSelector((state) => state.auth);
	const history = useHistory();
	const classes = useStyles();
	const menuToggleHandler = () => {
		setMenuOpen((prevOpen) => !prevOpen);
	};

	const menuCloseHandler = (e) => {
		if (menuAnchorRef.current && menuAnchorRef.current.contains(e.target)) {
			return;
		}
		setMenuOpen(false);
	};

	const listKeyDownHandler = (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		if (prevOpen.current === true && menuOpen === false) {
			menuAnchorRef.current.focus();
		}
		prevOpen.current = menuOpen;
	}, [menuOpen]);

	let navLinks = (
		<React.Fragment>
			<Typography
				component={NavLink}
				to={{ pathname: '/auth', signUp: false }}
				className={classes.buttons}
			>
				Login
			</Typography>
			<Typography
				component={NavLink}
				to={{ pathname: '/auth', signUp: true }}
				className={classes.buttons}
			>
				Sign Up
			</Typography>
		</React.Fragment>
	);
	if (isAuthenticated) {
		navLinks = (
			<React.Fragment>
				<Button
					ref={menuAnchorRef}
					aria-controls={menuOpen ? 'menuListGrow' : null}
					aria-haspopup='true'
					onClick={menuToggleHandler}
				>
					<Avatar
						alt={username !== null ? username : 'Test'}
						src={avatar}
						className={classes.avatar}
					/>
					<Typography className={classes.buttons}>{username}</Typography>
				</Button>
				<Popper
					open={menuOpen}
					anchorEl={menuAnchorRef.current}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom' ? 'center top' : 'center bottom',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={menuCloseHandler}>
									<MenuList
										id='menuListGrow'
										autoFocusItem={menuOpen}
										onKeyDown={listKeyDownHandler}
									>
										<MenuItem
											onClick={(e) => {
												history.push('/user');
												menuCloseHandler(e);
											}}
										>
											Profile
										</MenuItem>
										<MenuItem
											onClick={(e) => {
												history.push('/logout');
												menuCloseHandler(e);
											}}
										>
											Logout
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
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
						<MenuIcon />
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
