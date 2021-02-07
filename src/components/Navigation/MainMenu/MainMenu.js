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
	Tabs,
	Tab,
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
		paddingRight: theme.spacing(15),
		flexGrow: 0,
		color: theme.palette.primary.main,
		textDecoration: 'none',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 0, 0),
		},
	},
	menuButton: {
		[theme.breakpoints.up('sm')]: {
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
		display: 'flex',
		alignItems: 'center',
		minHeight: 'inherit',
		backgroundColor: 'white',
		color: '#00BAFF',
		border: 'none',
		boxShadow: 'none',
		flexGrow: 1,
	},
	tabs: {
		minHeight: 'inherit',
		display: 'flex',
		alignItems: 'center',
	},
	green: {
		color: theme.palette.getContrastText(colors.green[500]),
		backgroundColor: colors.green[500],
	},
}));

const MainMenu = (props) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);
	const menuAnchorRef = useRef();
	const prevOpen = useRef(menuOpen);
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const { username, email, avatar } = useSelector((state) => state.auth);
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		if (prevOpen.current === true && menuOpen === false) {
			menuAnchorRef.current.focus();
		}
		prevOpen.current = menuOpen;
	}, [menuOpen]);

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

	const tabsChangeHandler = (e, newValue) => {
		setTabValue(newValue);
	};

	let navLinks = (
		<Paper square className={classes.paper}>
			<Tabs
				className={classes.tabs}
				classes={{ flexContainer: classes.tabs, fixed: classes.tabs }}
				value={tabValue}
				onChange={tabsChangeHandler}
				indicatorColor='primary'
				variant='fullWidth'
			>
				<Tab
					className={classes.tabs}
					label='LIBROS'
					component={NavLink}
					to='/books'
					id='nav-tab-books'
				/>
				<Tab
					className={classes.tabs}
					label='CONTACTO'
					component={NavLink}
					to='/'
					id='nav-tab-contact'
				/>
			</Tabs>
		</Paper>
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
			<Paper square className={classes.paper}>
				<Tabs
					className={classes.tabs}
					classes={{ flexContainer: classes.tabs, fixed: classes.tabs }}
					value={tabValue}
					onChange={tabsChangeHandler}
					indicatorColor='primary'
					variant='fullWidth'
				>
					<Tab
						label='LIBROS'
						className={classes.tabs}
						component={NavLink}
						to='/books'
						id='nav-tab-books'
					/>
					<Tab
						className={classes.tabs}
						label='PUBLICAR'
						component={NavLink}
						to='/publish'
						id='nav-tab-publish'
					/>
					<Tab
						className={classes.tabs}
						label='CONTACTO'
						component={NavLink}
						to='/contact'
						id='nav-tab-contact'
					/>
				</Tabs>
			</Paper>
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
					<Typography variant='h6' className={classes.title}>
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
