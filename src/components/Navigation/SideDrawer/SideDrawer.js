import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Hidden,
	Drawer,
	Toolbar,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	makeStyles,
	useTheme,
} from '@material-ui/core';
import { MenuBook, Publish } from '@material-ui/icons';

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
	let links = ['Books'];
	if (isAuthenticated) {
		links = ['Books', 'Publish'];
	}
	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{links.map((text, index) => (
					<ListItem
						button
						key={text}
						component={NavLink}
						to={`/${text.toLowerCase()}`}
					>
						<ListItemIcon>
							{index % 2 === 0 ? (
								<MenuBook className={classes.icons} />
							) : (
								<Publish className={classes.icons} />
							)}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? window.document.body : undefined;
	return (
		<div>
			{/* <Hidden mdDown implementation='css'>
				<Drawer
					variant='permanent'
					className={classes.drawer}
					classes={{ paper: classes.paper }}
				>
					{drawer}
				</Drawer>
			</Hidden> */}
			<Hidden xsUp implementation='css'>
				<Drawer
					container={container}
					variant='temporary'
					anchor='left'
					className={classes.drawer}
					classes={{ paper: classes.paper }}
					open={props.openDrawer}
					onClose={props.toggleDrawer}
					// ModalProps={{ keepMounted: true }}
				>
					{drawer}
				</Drawer>
			</Hidden>
		</div>
	);
};

export default SideDrawer;
