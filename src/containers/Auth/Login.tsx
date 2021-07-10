import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isAuthenticatedSelector, isAuthLoadingSelector } from 'src/store/rootSelector';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Typography,
	Container,
	CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'src/store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
	},
	paper: {
		width: '100%',
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
		marginTop: theme.spacing(1),
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

const Login = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	const isLoading = useSelector(isAuthLoadingSelector);
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm();

	const onLogin = (email: any, password: any) =>
		dispatch(actions.login(email, password));

	const submitHandler = (data: any) => {
		onLogin(data.email, data.password);
	};

	let authRedirect = <Redirect to='/books' />;

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
						Ingresar
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
								required: 'Se requiere contraseña.',
								minLength: {
									value: 6,
									message: 'La contraseña es muy corta.',
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
						<FormControlLabel
							control={
								<Checkbox
									name='remember'
									color='primary'
									inputRef={register}
									defaultValue={0}
								/>
							}
							label='Recuérdeme'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							disabled={isLoading}
							className={classes.submit}
						>
							Ingresar
							{isLoading && (
								<CircularProgress size={24} className={classes.progress} />
							)}
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									¿Olvido su contraseña?
								</Link>
							</Grid>
							<Grid item>
								<Link variant='body2' component={NavLink} to='/signup'>
									{'¿No tiene una cuenta? Regístrese'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
};

export default Login;
