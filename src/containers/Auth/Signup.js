import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
	CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	progress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

const Signup = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const loading = useSelector((state) => state.auth.loading);
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm();

	const onSignup = (email, password) =>
		dispatch(actions.signup(email, password));

	const submitHandler = (data) => {
		onSignup(data.email, data.password);
	};

	let authRedirect = <Redirect to='/user' />;

	return (
		<div className={classes.root}>
			{isAuthenticated ? authRedirect : null}
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Registrarse
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit((data) => submitHandler(data))}
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Email is Required.',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid Email Address.',
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
								required: 'Password is Required.',
								minLength: {
									value: 6,
									message: 'Password is too short.',
								},
							})}
							fullWidth
							name='password'
							label='Contraseña'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						{errors.password && (
							<Alert variant='outlined' severity='error'>
								{errors.password.message}
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
							Registrarse
							{loading && (
								<CircularProgress size={24} className={classes.progress} />
							)}
						</Button>
						<Grid container justify='flex-end'>
							<Grid item>
								<Link variant='body2' component={NavLink} to='/login'>
									¿Ya tiene una cuenta? Ingrese
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
};

export default Signup;
