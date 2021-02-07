import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
	Avatar,
	Paper,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	IconButton,
	Typography,
	Container,
	makeStyles,
	CircularProgress,
	Link,
} from '@material-ui/core';
import { Email } from '@material-ui/icons';
import { Alert, Autocomplete } from '@material-ui/lab';
import { Facebook, WhatsApp, MailOutline } from '@material-ui/icons/';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {},
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flexGrow: 1,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(0),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
	progress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	footer: {
		padding: theme.spacing(5, 2),
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100vw',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[800],
	},
}));

const Contact = () => {
	const classes = useStyles();
	const [loading] = useState(false);
	const { register, handleSubmit, errors, reset } = useForm();

	const dispatch = useDispatch();

	const sendMessage = (data) => {
		console.log(data);
		reset({});
	};

	return (
		<>
			<Container component='main' maxWidth='sm'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<Email />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Enviar Mensaje
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit((data) => sendMessage(data))}
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Se requiere dirección de Email.',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Se requiere una dirección de Email valida.',
								},
							})}
							fullWidth
							id='email'
							label='Dirección de Email'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						{errors.email && (
							<Alert variant='outlined' severity='error'>
								{errors.email.message}
							</Alert>
						)}
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Se requiere Titulo.',
								maxLength: { value: 60, message: '60 Caracteres como Máximo.' },
							})}
							fullWidth
							id='title'
							label='Titulo'
							name='title'
							autoComplete='title'
						/>
						{errors.title && (
							<Alert variant='outlined' severity='error'>
								{errors.title.message}
							</Alert>
						)}
						<TextField
							variant='outlined'
							margin='normal'
							required
							multiline
							rows={4}
							inputRef={register({
								required: 'Se requiere un Mensaje.',
								maxLength: {
									value: 500,
									message: '500 Caracteres como Máximo.',
								},
							})}
							fullWidth
							id='message'
							label='Mensaje'
							name='message'
							autoComplete='message'
						/>
						{errors.message && (
							<Alert variant='outlined' severity='error'>
								{errors.message.message}
							</Alert>
						)}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							disabled={loading}
							className={classes.submit}
						>
							Enviar Mensaje
							{loading && (
								<CircularProgress size={24} className={classes.progress} />
							)}
						</Button>
					</form>
				</div>
			</Container>
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
							href='https://libros-dani.web.app/books'
							target='_blank'
						>
							Libros Dani
						</Link>{' '}
						{new Date().getFullYear()}
						{'.'}
					</Typography>
				</Container>
			</footer>
		</>
	);
};

export default Contact;
