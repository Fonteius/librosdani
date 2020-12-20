import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Avatar,
	Paper,
	Button,
	CardMedia,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	Typography,
	Container,
	makeStyles,
	CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	imageList: {
		display: 'block',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflowY: 'hidden',
		overflowX: 'auto',
		backgroundColor: theme.palette.background.paper,
	},
	imageSize: {
		// minHeight: 'auto',
		// minWidth: '20vh',
		// maxWidth: 'auto',
		// maxHeight: 180,
		// maxWidth: 180,
		minWidth: '180px',
		maxWidth: '180px',
	},
	gridList: {
		flexWrap: 'nowrap',
		overflow: 'initial',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	title: {
		color: theme.palette.primary.light,
	},
	titleBar: {
		// background:
		// 	'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	paper: {
		marginTop: theme.spacing(1),
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

const Publish = () => {
	const classes = useStyles();
	let imageInputRef = useRef(null);
	const [images, setImages] = useState(null);
	const idToken = useSelector((state) => state.auth.idToken);
	const loading = useSelector((state) => state.books.loading);
	const { register, handleSubmit, errors } = useForm();

	const dispatch = useDispatch();
	const onPublishBook = (idToken, book) =>
		dispatch(actions.addBook(idToken, book));
	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);

	useEffect(() => {
		onFetchBooks();
	}, [onFetchBooks]);

	const publishBook = (data) => {
		const book = {
			title: data.title,
			author: data.author,
			price: data.price,
			editorial: data.editorial,
			year: data.year,
			pictures: [...images],
		};
		onPublishBook(idToken, book);
	};

	const addImageHandler = (ref) => {
		ref.current.click();
	};

	const setImageHandler = (e) => {
		let files = [];
		if (images === null) {
			if (e.target.files.length !== 1) {
				for (let index = 0; index < e.target.files.length; index++) {
					const file = e.target.files[index];
					files.push(file);
				}
				setImages(files);
				files = [];
			} else {
				setImages([e.target.files[0]]);
			}
		} else {
			if (e.target.files.length !== 1) {
				for (let index = 0; index < e.target.files.length; index++) {
					const file = e.target.files[index];
					files.push(file);
				}
				setImages((state) => [...state, ...files]);
				files = [];
			} else {
				setImages((state) => [...state, e.target.files[0]]);
			}
		}
	};

	const removeImageHandler = (item) => {
		const newImages = images.filter((img) => img !== item);
		setImages(newImages);
	};

	const imageList = (
		<div className={classes.imageList}>
			<GridList className={classes.gridList} cols={2} spacing={0}>
				<GridListTile key='1'>
					<Paper className={classes.imageSize} />
					<GridListTileBar
						title='Add Image'
						classes={{
							root: classes.titleBar,
							title: classes.title,
						}}
						actionIcon={
							<IconButton
								aria-label='Add Images'
								onClick={() => addImageHandler(imageInputRef)}
							>
								<input
									type='file'
									id='uploadButton'
									style={{ display: 'none' }}
									multiple
									accept='image/png, image/jpeg'
									ref={imageInputRef}
									className={classes.imageSize}
									onChange={setImageHandler}
								/>
								<InsertPhotoOutlinedIcon className={classes.title} />
							</IconButton>
						}
					/>
				</GridListTile>
				{images
					? images.map((item, index) => (
							<GridListTile key={index}>
								<img src={URL.createObjectURL(item)} alt='' />
								<GridListTileBar
									title='Remove Image'
									classes={{
										root: classes.titleBar,
										title: classes.title,
									}}
									actionIcon={
										<IconButton
											aria-label='Remove Image'
											onClick={() => removeImageHandler(item)}
										>
											<CancelIcon className={classes.title}></CancelIcon>
										</IconButton>
									}
								/>
							</GridListTile>
					  ))
					: null}
			</GridList>
		</div>
	);

	return (
		<>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<PublishOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Publish
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit((data) => publishBook(data))}
					>
						{imageList}
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Title is Required.',
								maxLength: { value: 60, message: 'Max 60 Characters.' },
							})}
							fullWidth
							id='title'
							label='Title'
							name='title'
							autoComplete='title'
							autoFocus
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
							inputRef={register({
								required: 'Author is Required.',
								maxLength: { value: 60, message: 'Max 60 Characters.' },
							})}
							fullWidth
							name='author'
							label='Author'
							type='author'
							id='author'
							autoComplete='author'
						/>
						{errors.author && (
							<Alert variant='outlined' severity='error'>
								{errors.author.message}
							</Alert>
						)}
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Price is Required.',
								maxLength: { value: 5, message: 'Max 5 Characters.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Can only input Numbers.',
								},
							})}
							fullWidth
							id='price'
							label='Price'
							name='price'
							autoComplete='price'
						/>
						{errors.price && (
							<Alert variant='outlined' severity='error'>
								{errors.price.message}
							</Alert>
						)}
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Editorial is Required.',
								maxLength: { value: 60, message: 'Max 60 Characters.' },
							})}
							fullWidth
							name='editorial'
							label='Editorial'
							type='editorial'
							id='editorial'
							autoComplete='editorial'
						/>
						{errors.editorial && (
							<Alert variant='outlined' severity='error'>
								{errors.editorial.message}
							</Alert>
						)}
						<TextField
							variant='outlined'
							margin='normal'
							required
							inputRef={register({
								required: 'Year is Required.',
								maxLength: { value: 4, message: 'Max 4 Characters.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Can only input Numbers.',
								},
							})}
							fullWidth
							id='year'
							label='Year'
							name='year'
							autoComplete='year'
						/>
						{errors.year && (
							<Alert variant='outlined' severity='error'>
								{errors.year.message}
							</Alert>
						)}
						<FormControlLabel
							control={
								<Checkbox
									name='remember'
									color='primary'
									inputRef={register}
									defaultValue={false}
								/>
							}
							label='Remember Selections'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							disabled={loading}
							className={classes.submit}
						>
							Publish
							{loading && (
								<CircularProgress size={24} className={classes.progress} />
							)}
						</Button>
					</form>
				</div>
			</Container>
		</>
	);
};

export default Publish;
