import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Drawer,
	Toolbar,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	makeStyles,
} from '@material-ui/core';
import { MenuBook, Publish } from '@material-ui/icons';

const drawerWidth = 200;

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

const SideDrawer = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const classes = useStyles();

	let links = ['Books'];
	if (isAuthenticated) {
		links = ['Books', 'Publish'];
	}
	return (
		<Drawer
			variant='permanent'
			className={classes.drawer}
			classes={{ paper: classes.paper }}
		>
			<Toolbar />
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
		</Drawer>
	);
};

export default SideDrawer;
