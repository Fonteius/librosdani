import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Avatar,
	Paper,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	Typography,
	Container,
	makeStyles,
	CircularProgress,
} from '@material-ui/core';
import {
	PublishOutlined,
	InsertPhotoOutlined,
	Cancel,
} from '@material-ui/icons';
import { Alert, Autocomplete } from '@material-ui/lab';
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
		marginTop: theme.spacing(0),
	},
	tags: {
		margin: theme.spacing(2, 0, 0),
	},
	submit: {
		margin: theme.spacing(0, 0, 2),
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
	const [imageAlert, setImageAlert] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);
	const [tagsAlert, setTagsAlert] = useState(false);
	const [touchedSubmit, setTouchedSubmit] = useState(false);
	const idToken = useSelector((state) => state.auth.idToken);
	const loading = useSelector((state) => state.books.loading);
	const tags = useSelector((state) => state.tags.tags);
	const { register, handleSubmit, errors, reset } = useForm();

	const dispatch = useDispatch();
	const onPublishBook = (idToken, book) =>
		dispatch(actions.addBook(idToken, book));
	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);
	const onFetchTags = useCallback(() => dispatch(actions.fetchTags()), [
		dispatch,
	]);

	useEffect(() => {
		onFetchBooks();
		onFetchTags();
	}, [onFetchBooks, onFetchTags]);

	useEffect(() => {
		if (touchedSubmit) {
			if (selectedTags.length !== 0) {
				setTagsAlert(false);
			} else {
				setTagsAlert(true);
			}
		}
	}, [selectedTags, touchedSubmit]);

	const publishBook = (data) => {
		setTouchedSubmit(true);
		if (!images || selectedTags.length === 0) {
			!images ? setImageAlert(true) : setImageAlert(false);
			selectedTags.length === 0 ? setTagsAlert(true) : setTagsAlert(false);
			return;
		} else {
			setImageAlert(false);
			setTagsAlert(false);
			const book = {
				title: data.title,
				author: data.author,
				price: data.price,
				editorial: data.editorial,
				year: data.year,
				pictures: [...images],
				tags: [...selectedTags],
			};
			onPublishBook(idToken, book);
			if (!data.remember) {
				reset({});
				setTouchedSubmit(false);
				setImages(null);
				setSelectedTags([]);
			}
		}
	};

	const addImageHandler = (ref) => {
		ref.current.click();
	};

	const setImageHandler = (e) => {
		let files = [];
		setImageAlert(true);
		if (images === null) {
			if (e.target.files.length !== 1) {
				for (let index = 0; index < e.target.files.length; index++) {
					const file = e.target.files[index];
					files.push(file);
				}
				setImageAlert(false);
				setImages(files);
				files = [];
			} else {
				setImageAlert(false);
				setImages([e.target.files[0]]);
			}
		} else {
			if (e.target.files.length !== 1) {
				for (let index = 0; index < e.target.files.length; index++) {
					const file = e.target.files[index];
					files.push(file);
				}
				setImageAlert(false);
				setImages((state) => [...state, ...files]);
				files = [];
			} else {
				setImageAlert(false);
				setImages((state) => [...state, e.target.files[0]]);
			}
		}
	};

	const removeImageHandler = (item) => {
		const newImages = images.filter((img) => img !== item);
		if (newImages.length === 0) {
			setImages(null);
			setImageAlert(true);
		} else {
			setImages(newImages);
		}
	};

	const tagsInputHandler = (value) => {
		setSelectedTags(value);
	};

	const capitalizeText = (text) => {
		return text.replace(/\w\S*/g, (w) =>
			w.replace(/^\w/, (c) => c.toUpperCase())
		);
	};

	const imageList = (
		<div className={classes.imageList}>
			<GridList className={classes.gridList} cols={2} spacing={0}>
				<GridListTile key='1'>
					<Paper className={classes.imageSize} />
					<GridListTileBar
						title='Agregar Fotos'
						classes={{
							root: classes.titleBar,
							title: classes.title,
						}}
						actionIcon={
							<IconButton
								aria-label='Agregar Fotos'
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
								<InsertPhotoOutlined className={classes.title} />
							</IconButton>
						}
					/>
				</GridListTile>
				{images
					? images.map((item, index) => (
							<GridListTile key={index}>
								<img src={URL.createObjectURL(item)} alt='' />
								<GridListTileBar
									title='Remover Foto'
									classes={{
										root: classes.titleBar,
										title: classes.title,
									}}
									actionIcon={
										<IconButton
											aria-label='Remover Foto'
											onClick={() => removeImageHandler(item)}
										>
											<Cancel className={classes.title}></Cancel>
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
						<PublishOutlined />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Publicar
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit((data) => publishBook(data))}
					>
						{imageList}
						{imageAlert ? (
							<Alert variant='outlined' severity='error'>
								Debe ingresar al menos una imagen.
							</Alert>
						) : null}
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
								required: 'Se requiere Autor.',
								maxLength: { value: 60, message: '60 Caracteres como Máximo.' },
							})}
							fullWidth
							name='author'
							label='Autor'
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
								required: 'Se requiere Precio.',
								maxLength: { value: 5, message: '5 Caracteres como Máximo.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Solo se pueden ingresar Números.',
								},
							})}
							fullWidth
							id='price'
							label='Precio'
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
								required: 'Se requiere Editorial.',
								maxLength: { value: 60, message: '60 Caracteres como Máximo.' },
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
								required: 'Se requiere Año.',
								maxLength: { value: 4, message: '4 Caracteres como Máximo.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Solo se pueden ingresar Números.',
								},
							})}
							fullWidth
							id='year'
							label='Año'
							name='year'
							autoComplete='year'
						/>
						{errors.year && (
							<Alert variant='outlined' severity='error'>
								{errors.year.message}
							</Alert>
						)}
						<Autocomplete
							style={{ textTransform: 'capitalize' }}
							className={classes.tags}
							multiple
							id='tags'
							value={selectedTags}
							options={tags.sort((a, b) => {
								return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
							})}
							getOptionLabel={(tags) => capitalizeText(tags.title)}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									{...params}
									variant='outlined'
									required
									label='Tags'
									placeholder='Género'
								/>
							)}
							onChange={(e, newValue) => tagsInputHandler(newValue)}
						/>
						{tagsAlert ? (
							<Alert variant='outlined' severity='error'>
								Debe ingresar al menos un Género Literario.
							</Alert>
						) : null}
						<FormControlLabel
							control={
								<Checkbox
									name='remember'
									color='primary'
									inputRef={register}
									defaultValue={false}
								/>
							}
							label='Recordar Datos'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							disabled={loading}
							className={classes.submit}
						>
							Publicar
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
