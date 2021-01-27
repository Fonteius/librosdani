import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Hidden,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	makeStyles,
	useTheme,
} from '@material-ui/core';
import {
	Book,
	AccountCircle,
	Publish,
	ExitToApp,
	AddCircleOutline,
	Home,
} from '@material-ui/icons';

const SideDrawer = (props) => {
	const theme = useTheme();
	const drawerWidth = theme.drawer.width;

	const useStyles = makeStyles((theme) => ({
		drawer: {
			color: 'green !important',
			flexShrink: 0,
			width: drawerWidth,
			overflow: 'auto',
		},
		paper: {
			background: '#263238',
			width: drawerWidth,
			color: '#ccc',
		},
		icons: {
			color: '#fff',
		},
	}));

	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const classes = useStyles();
	let links = ['/', 'Books', 'Login', 'Signup'];
	if (isAuthenticated) {
		links = ['/', 'Books', 'Publish', 'Logout'];
	}

	const getNavIcon = (text) => {
		switch (text) {
			case '/':
				return <Home className={classes.icons} />;
			case 'Books':
				return <Book className={classes.icons} />;
			case 'Login':
				return <AccountCircle className={classes.icons} />;
			case 'Signup':
				return <AddCircleOutline className={classes.icons} />;
			case 'Publish':
				return <Publish className={classes.icons} />;
			case 'Logout':
				return <ExitToApp className={classes.icons} />;
			default:
				break;
		}
	};

	const drawer = (
		<div>
			<List>
				{links.map((text, index) => (
					<ListItem
						button
						key={text}
						component={NavLink}
						to={
							text !== '/' ? `/${text.toLowerCase()}` : `${text.toLowerCase()}`
						}
						onClick={props.toggleDrawer}
					>
						<ListItemIcon>{getNavIcon(text)}</ListItemIcon>
						<ListItemText
							primary={text !== '/' ? text.toUpperCase() : 'HOME'}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? window.document.body : undefined;
	return (
		<div>
			<Hidden xsUp implementation='css'>
				<Drawer
					container={container}
					variant='temporary'
					anchor='left'
					className={classes.drawer}
					classes={{ paper: classes.paper }}
					open={props.openDrawer}
					onClose={props.toggleDrawer}
				>
					{drawer}
				</Drawer>
			</Hidden>
		</div>
	);
};

export default SideDrawer;
