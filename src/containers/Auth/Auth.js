import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';
import { makeStyles, Button } from '@material-ui/core';
import MyInput from '../../components/UI/MyInput/MyInput';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	Auth: {
		display: 'flex-root',
		marginTop: '100px',
		marginLeft: '250px',
		marginRight: '50px',
		padding: '10px 10px',
		width: '350px',
		textAlign: 'center',
		flexGrow: 1,
		boxShadow: '0 2px 3px #ccc',
		border: '1px solid #eee',
		boxSizing: 'border-box',
	},
}));

const Auth = (props) => {
	const classes = useStyles();
	const [isSignup, setIsSignup] = useState(false);
	const [authForm, setAuthForm] = useState({
		username: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Username',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Email',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});
	const usernameInput = useRef();

	const dispatch = useDispatch();

	const loading = useSelector((state) => state.auth.loading);
	const error = useSelector((state) => state.auth.error);
	const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
	const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);

	const onAuth = (username, email, password, isSignup) =>
		dispatch(actions.auth(username, email, password, isSignup));
	const onSetAuthRedirectPath = useCallback(
		() => dispatch(actions.setAuthRedirectPath('/books')),
		[dispatch]
	);

	const { signUp } = props.location;
	useEffect(() => {
		setIsSignup(signUp);
		usernameInput.current.focus();
	}, [signUp]);

	useEffect(() => {
		if (authRedirectPath !== '/books') {
			onSetAuthRedirectPath();
		}
	}, [authRedirectPath, onSetAuthRedirectPath]);

	useEffect(() => {
		usernameInput.current.focus();
	}, []);

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...authForm,
			[controlName]: {
				...authForm[controlName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					authForm[controlName].validation
				),
				touched: true,
			},
		};
		setAuthForm(updatedControls);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		onAuth(
			authForm.username.value,
			authForm.email.value,
			authForm.password.value,
			isSignup
		);
	};

	const switchAuthModeHandler = () => {
		setIsSignup(!isSignup);
	};

	const formElementsArray = [];
	for (let key in authForm) {
		formElementsArray.push({
			id: key,
			config: authForm[key],
		});
	}
	let form = formElementsArray.map((formElement) => {
		if (formElement.id === 'username' && isSignup) {
			formElement.config.elementConfig.placeholder = 'Username';
		}
		if (formElement.id === 'username' && !isSignup) {
			formElement.config.elementConfig.placeholder = 'Username/Email';
		}
		if (formElement.id === 'email' && !isSignup) {
			return null;
		}
		return (
			<MyInput
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => inputChangedHandler(event, formElement.id)}
				reference={formElement.id === 'username' ? usernameInput : null}
			/>
		);
	});

	if (loading) {
		// form = <Spinner />;
	}

	let errorMessage = null;
	if (error) {
		errorMessage = <p>{error.message}</p>;
	}

	let authRedirect = null;
	if (isAuthenticated) {
		authRedirect = <Redirect to={authRedirectPath} />;
	}

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<Button color='primary' onClick={switchAuthModeHandler}>
				{!isSignup ? 'Login' : 'Sign UP'} Form
			</Button>
			<form onSubmit={(e) => submitHandler(e)}>
				{form}
				<Button color='primary' type='submit'>
					{!isSignup ? 'Login' : 'Sign Up'}
				</Button>
			</form>
		</div>
	);
};

export default Auth;
