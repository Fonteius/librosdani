import React from 'react';
import {
	makeStyles,
	Container,
	Typography,
	CssBaseline,
	Link,
} from '@material-ui/core';
import { Facebook, WhatsApp, MailOutline } from '@material-ui/icons/';

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
		gradient: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			background: 'linear-gradient(-45deg, #1E3462, #00BAFF)',
			// background: 'linear-gradient(-45deg, #5a3f37, #2c7744)',
			// background: 'linear-gradient(-45deg, green, black)',
			backgroundSize: '400% 400%',
			backgroundPosition: '400%',
			animation: `$gradient 20s ease infinite`,
			height: '100vh',
		},
		'@keyframes gradient': {
			'0%': {
				backgroundPosition: '0%',
			},
			'50%': {
				backgroundPosition: '100%',
			},
			'100%': {
				backgroundPosition: '0%',
			},
		},
		footer: {
			padding: theme.spacing(5, 2),
			marginTop: 'auto',
			backgroundColor:
				theme.palette.type === 'light'
					? theme.palette.grey[200]
					: theme.palette.grey[800],
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.gradient}>
			<CssBaseline />
			<footer className={classes.footer}>
				<Container>
					<Typography>CONTACTO :</Typography>
					<Typography>CELULAR : +54-223-3033286</Typography>
					<Typography>FIJO : +54-223-487-5671</Typography>
					<Typography>E-MAIL : daniel_mena_olivares@hotmail.com</Typography>
					<Link
						href='https://www.facebook.com/profile.php?id=100007836255790'
						target='_blank'
					>
						<Facebook fontSize='large' />
					</Link>
					<Link href='https://wa.me/5402233033286' target='_blank'>
						<WhatsApp fontSize='large' />
					</Link>
					<Link href='mailto:daniel_mena_olivares@hotmail.com' target='_blank'>
						<MailOutline fontSize='large' />
					</Link>
					<Typography variant='body2' color='textSecondary'>
						<Link
							color='inherit'
							href='https://libros-dani.web.app/'
							target='_blank'
						>
							Libros Dani
						</Link>{' '}
						{new Date().getFullYear()}
						{'.'}
					</Typography>
				</Container>
			</footer>
		</div>
	);
};

export default Main;
