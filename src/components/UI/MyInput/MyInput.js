import React from 'react';
import { Input, Button } from '@material-ui/core';

const MyInput = (props) => {
	let inputElement = null;
	if (props.invalid && props.shouldValidate && props.touched) {
	}
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<Input
					type={props.elementConfig.type}
					placeholder={props.elementConfig.placeholder}
					value={props.value}
					onChange={props.changed}
					inputRef={props.reference}
				/>
			);
			break;
		case 'images':
			let cancelButton =
				props.value !== 'Select Images' ? (
					<Button onClick={props.cancel}>Cancel</Button>
				) : null;
			inputElement = (
				<div>
					<input
						type='file'
						id='uploadButton'
						style={{ display: 'none' }}
						multiple
						onChange={props.changed}
						accept='image/png, image/jpeg'
					/>
					<label htmlFor='uploadButton'>
						<Button component='span'>{props.value}</Button>
					</label>
					{cancelButton}
				</div>
			);
			break;
		default:
			inputElement = (
				<Input
					type={props.elementConfig.type}
					placeholder={props.elementConfig.placeholder}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
	}
	let validationError = null;
	if (props.invalid && props.touched) {
		validationError = <p>Please enter a valid value!</p>;
	}

	return (
		<div>
			<label>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default MyInput;
