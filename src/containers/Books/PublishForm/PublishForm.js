import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkValidity, checkImages } from '../../../shared/utility';
import { Button } from '@material-ui/core';
import MyInput from '../../../components/UI/MyInput/MyInput';
import { makeStyles, Typography } from '@material-ui/core';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	publishForm: {
		display: 'flex',
		flexGrow: 1,
		marginTop: '100px',
		marginLeft: '250px',
		marginRight: '50px',
		padding: '30px 30px',
		width: '20vw',
		textAlign: 'center',
		boxShadow: '0 2px 3px #ccc',
		border: '1px solid #eee',
		boxSizing: 'border-box',
		justifyContent: 'center',
	},
}));

const PublishForm = () => {
	const [bookForm, setBookForm] = useState({
		title: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Title',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		author: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Author',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		price: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Price',
			},
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		editorial: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Editorial',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		year: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Year',
			},
			value: '',
			validation: {
				required: true,
				minLength: 4,
				maxLength: 4,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		images: {
			elementType: 'images',
			elementConfig: {
				type: 'file',
				placeholder: 'Images',
			},
			value: 'Select Images',
			files: [],
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
	});
	const [formIsValid, setFormIsValid] = useState(false);
	const classes = useStyles();

	const idToken = useSelector((state) => state.auth.idToken);
	const isLoading = useSelector((state) => state.books.loading);

	const dispatch = useDispatch();
	const onPublishBook = (idToken, book) =>
		dispatch(actions.addBook(idToken, book));
	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);

	useEffect(() => {
		onFetchBooks();
	}, [onFetchBooks]);

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...bookForm,
			[controlName]: {
				...bookForm[controlName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					bookForm[controlName].validation
				),
				touched: true,
			},
		};
		let formIsValid = true;
		for (let key in updatedControls) {
			formIsValid = updatedControls[key].valid && formIsValid;
		}
		console.log(updatedControls.price.value);
		setBookForm(updatedControls);
		setFormIsValid(formIsValid);
	};

	const imagesChangedHandler = (event, controlName) => {
		let value = 'Select Images';
		if (event.target.files.length === 1) {
			value = event.target.files[0].name;
		} else if (event.target.files.length > 1) {
			value = event.target.files.length + ' Images Selected';
		}
		const updatedControls = {
			...bookForm,
			[controlName]: {
				...bookForm[controlName],
				value: value,
				files: [...event.target.files],
				valid: checkImages(
					event.target.files,
					bookForm[controlName].validation
				),
				touched: true,
			},
		};
		let formIsValid = true;
		for (let key in updatedControls) {
			formIsValid = updatedControls[key].valid && formIsValid;
		}
		setBookForm(updatedControls);
		setFormIsValid(formIsValid);
	};

	const imagesCancelSelectionHandler = async (event, controlName) => {
		let newValue = 'Select Images';
		const updatedControls = {
			...bookForm,
			[controlName]: {
				...bookForm[controlName],
				value: newValue,
				files: [],
				valid: false,
				touched: false,
			},
		};
		let formIsValid = true;
		for (let key in updatedControls) {
			formIsValid = updatedControls[key].valid && formIsValid;
		}
		await setBookForm(updatedControls);
		await setFormIsValid(formIsValid);
	};

	const initBookForm = () => {
		setFormIsValid(false);
		setBookForm({
			title: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Title',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			author: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Author',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			price: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Price',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			editorial: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Editorial',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			year: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Year',
				},
				value: '',
				validation: {
					required: true,
					minLength: 4,
					maxLength: 4,
				},
				valid: false,
				touched: false,
			},
			images: {
				elementType: 'images',
				elementConfig: {
					type: 'file',
					placeholder: 'Images',
				},
				value: 'Select Images',
				files: [],
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
		});
	};

	const publishBook = (event) => {
		event.preventDefault();
		const formData = {};
		for (let item in bookForm) {
			if (item === 'images') {
				formData[item] = bookForm[item].files;
			} else {
				formData[item] = bookForm[item].value;
			}
		}
		const book = {
			title: formData.title,
			author: formData.author,
			price: formData.price,
			editorial: formData.editorial,
			year: formData.year,
			pictures: formData.images,
		};
		initBookForm();
		onPublishBook(idToken, book);
	};

	const formElementsArray = [];
	for (let key in bookForm) {
		formElementsArray.push({
			id: key,
			config: bookForm[key],
		});
	}
	let form = formElementsArray.map((formElement) => {
		if (formElement.config.elementType === 'images') {
			return (
				<MyInput
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => imagesChangedHandler(event, formElement.id)}
					cancel={(event) =>
						imagesCancelSelectionHandler(event, formElement.id)
					}
				/>
			);
		} else {
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
				/>
			);
		}
	});

	return (
		<div className={classes.publishForm}>
			<form onSubmit={(e) => publishBook(e)}>
				<Typography variant='h5'>Publish Book</Typography>
				{form}
				<Button color='primary' type='submit' disabled={!formIsValid}>
					Publish
				</Button>
				{isLoading ? <span>...Loading</span> : null}
			</form>
		</div>
	);
};

export default PublishForm;
