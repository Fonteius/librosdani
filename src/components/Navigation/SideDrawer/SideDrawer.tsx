import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from 'src/store/rootSelector';
import { ITheme } from 'src/types/theme';
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

const SideDrawer = (props: any) => {
	const theme: ITheme = useTheme();
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

	const isAuthenticated = useSelector(isAuthenticatedSelector);
	const classes = useStyles();
	let links = [
		{ title: 'LIBROS', link: 'Books' },
		{ title: 'CONTACTO', link: 'Contact' },
		{ title: 'INGRESAR', link: 'Login' },
		{ title: 'REGISTRARSE', link: 'Signup' },
	];
	if (isAuthenticated) {
		links = [
			{ title: 'LIBROS', link: 'Books' },
			{ title: 'CONTACTO', link: 'Contact' },
			{ title: 'PUBLICAR', link: 'Publish' },
			{ title: 'SALIR', link: 'Logout' },
		];
	}

	const getNavIcon = (text: any) => {
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
						key={text.title}
						component={NavLink}
						to={
							text.link !== '/'
								? `/${text.link.toLowerCase()}`
								: `${text.link.toLowerCase()}`
						}
						onClick={props.toggleDrawer}
					>
						<ListItemIcon>{getNavIcon(text.link)}</ListItemIcon>
						<ListItemText
							primary={
								text.link !== '/' ? text.title.toUpperCase() : 'CONTACTO'
							}
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
