import React, { useState, useRef, useEffect, Fragment } from 'react';
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
	colors,
	Hidden,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		color: 'black',
		width: '100vw',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#fff !important',
		boxShadow: '0 0 0 1px #263238',
	},
	title: {
		paddingLeft: theme.spacing(8),
		// paddingRight: theme.spacing(15),
		flexGrow: 1,
		color: theme.palette.primary.main,
		textDecoration: 'none',
	},
	menuButton: {
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	buttons: {
		color: '#00BAFF',
		textDecoration: 'none',
		textTransform: 'capitalize',
		marginRight: theme.spacing(2),
		borderRadius: '25px',
	},
	navLinks: {
		letterSpacing: '1px',
		flexGrow: 1,
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
	green: {
		color: theme.palette.getContrastText(colors.green[500]),
		backgroundColor: colors.green[500],
	},
}));

const MainMenu = (props) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuAnchorRef = useRef();
	const prevOpen = useRef(menuOpen);
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const { username, email, avatar } = useSelector((state) => state.auth);
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
		<Fragment>
			<Typography
				component={NavLink}
				to='/books'
				className={`${classes.buttons} ${classes.navLinks}`}
			>
				LIBROS
			</Typography>
		</Fragment>
	);

	let authLinks = (
		<Fragment>
			<Button
				component={NavLink}
				to='/login'
				variant='outlined'
				color='primary'
				className={classes.buttons}
			>
				Ingresar
			</Button>
			<Button
				component={NavLink}
				to='/signup'
				variant='outlined'
				color='primary'
				className={classes.buttons}
			>
				Registrarse
			</Button>
		</Fragment>
	);
	if (isAuthenticated) {
		navLinks = (
			<Fragment>
				<Typography
					component={NavLink}
					to='/books'
					className={`${classes.buttons} ${classes.navLinks}`}
				>
					LIBROS
				</Typography>
				<Typography
					component={NavLink}
					to='/publish'
					className={`${classes.buttons} ${classes.navLinks}`}
				>
					PUBLICAR
				</Typography>
			</Fragment>
		);
		authLinks = (
			<Fragment>
				<Button
					ref={menuAnchorRef}
					aria-controls={menuOpen ? 'menuListGrow' : null}
					aria-haspopup='true'
					onClick={menuToggleHandler}
				>
					<Avatar
						alt={username || email}
						src={avatar}
						className={`${classes.avatar} ${classes.green}`}
					>
						{(username || email).substring(0, 1)}
					</Avatar>
					<Typography
						className={classes.buttons}
						style={{ textTransform: 'lowercase' }}
					>
						{username || email}
					</Typography>
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
											Perfil
										</MenuItem>
										<MenuItem
											onClick={(e) => {
												history.push('/logout');
												menuCloseHandler(e);
											}}
										>
											Cerrar sesión
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Fragment>
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
					<Hidden xsDown>
						{navLinks}
						{authLinks}
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default MainMenu;
