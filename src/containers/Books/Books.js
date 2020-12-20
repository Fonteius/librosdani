import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Container,
	CssBaseline,
	FormGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	Select,
	Checkbox,
	MenuItem,
	TextField,
	LinearProgress,
} from '@material-ui/core';
import { Pagination, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		// width: '100vw',
	},
	filter: {
		// height: '50vw',
	},
	pagination: {
		justifyContent: 'center',
	},
	formControl: {
		margin: theme.spacing(0),
		// minWidth: 120,
	},
	container: {
		// maxWidth: '60vw',
		width: '100vw',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		// paddingLeft: theme.spacing(2),
		// paddingRight: theme.spacing(2),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	grid: {
		margin: theme.spacing(0),
		width: '100%',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
		height: '100%',
		width: '100%',
	},
	mediaButton: {
		padding: 0,
		margin: 0,
	},
	cardContent: {
		flexGrow: 1,
	},
	submitSearch: {
		display: 'none',
	},
	progress: {
		width: '100vw',
		// position: 'absolute',
		// marginTop: 15,
		// marginLeft: 15,
	},
}));

const Books = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm();

	const [currentBooks, setCurrentBooks] = useState();
	const [orderedBooks, setOrderedBooks] = useState();
	const [search, setSearch] = useState('');
	const [order, setOrder] = useState(0);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [pageLimit, setPageLimit] = useState(6);

	const allBooks = useSelector((state) => state.books);
	const loading = useSelector((state) => state.books.loading);

	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);

	const filterBooks = useCallback(() => {
		const searchResult = allBooks.books.filter(
			(item) =>
				(item.title.toLowerCase() + ' ' + item.author.toLowerCase()).indexOf(
					search.toString().toLowerCase()
				) >= 0
		);
		const totalPages = Math.ceil(searchResult.length / pageLimit);

		let orderedBooks = [];
		switch (order) {
			case 0:
				orderedBooks = searchResult.sort((a, b) => {
					return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
				});
				break;
			case 1:
				orderedBooks = searchResult.sort((a, b) => {
					return a.title > b.title ? -1 : b.title > a.title ? 1 : 0;
				});
				break;
			case 2:
				orderedBooks = searchResult.sort((a, b) => {
					return a.price - b.price;
				});
				break;
			case 3:
				orderedBooks = searchResult.sort((a, b) => {
					return b.price - a.price;
				});
				break;
			default:
				orderedBooks = [...searchResult];
				break;
		}
		const offset = (page - 1) * pageLimit;
		const currentBooks = orderedBooks.slice(offset, offset + pageLimit);
		setTotalPages(totalPages);
		setOrderedBooks(orderedBooks);
		setCurrentBooks(currentBooks);
	}, [allBooks.books, page, pageLimit, search, order]);

	useEffect(() => {
		onFetchBooks();
	}, [onFetchBooks]);

	useEffect(() => {
		setPage(1);
	}, [order, search]);

	useEffect(() => {
		filterBooks();
	}, [filterBooks]);

	const detailButtonHandler = (id, title) => {
		history.push(`/book/${id}/${title}`);
	};

	const searchHandler = (data) => {
		setSearch(data.search);
	};

	const orderSelectionHandler = (e) => {
		setOrder(e.target.value);
	};

	const pageHandler = (e, value) => {
		setPage(value);
	};

	let filterBar = (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>FILTRAR POR:</FormLabel>
			<FormGroup aria-label='position' row>
				<FormControlLabel
					value='end'
					control={<Checkbox color='primary' />}
					label='Precio'
					labelPlacement='end'
				/>
			</FormGroup>
			<FormLabel component='legend'>ORDENAR POR:</FormLabel>
			<Select
				id='order'
				label='Order'
				labelId='order'
				name='order'
				value={order}
				onChange={(e) => orderSelectionHandler(e)}
			>
				<MenuItem value={0}>Titulo : A-Z</MenuItem>
				<MenuItem value={1}>Titulo : Z-A</MenuItem>
				<MenuItem value={2}>Precio : Menor a Mayor</MenuItem>
				<MenuItem value={3}>Precio : Mayor a Menor</MenuItem>
				<MenuItem value={4}>Año : Menor a Mayor</MenuItem>
				<MenuItem value={5}>Año : Mayor a Menor</MenuItem>
			</Select>
			<FormLabel component='legend'>
				RESULTADOS: {orderedBooks ? orderedBooks.length : null}
			</FormLabel>
		</FormControl>
	);

	let searchBar = (
		<form
			className={classes.form}
			noValidate
			onSubmit={handleSubmit((data) => searchHandler(data))}
		>
			<TextField
				id='search'
				label='Search'
				name='search'
				variant='outlined'
				autoFocus
				inputRef={register({
					maxLength: { value: 60, message: 'Max 60 Characters.' },
				})}
			/>
			{errors.search && (
				<Alert variant='outlined' severity='error'>
					{errors.search.message}
				</Alert>
			)}
			{/* <FormControl variant='outlined' className={classes.formControl}>
				<InputLabel id='order'>Orden</InputLabel>
				<Select
					id='order'
					label='Order'
					labelId='order'
					name='order'
					value={order}
					onChange={(e) => orderSelectionHandler(e)}
				>
					<MenuItem value={0}>A-Z</MenuItem>
					<MenuItem value={1}>Z-A</MenuItem>
				</Select>
			</FormControl> */}
			<Button
				type='submit'
				variant='outlined'
				color='primary'
				className={classes.submitSearch}
			>
				Search
			</Button>
		</form>
	);

	let paginationBar = (
		<Pagination
			count={totalPages}
			page={page}
			variant='outlined'
			shape='rounded'
			onChange={pageHandler}
			size='large'
			classes={{ ul: classes.pagination }}
		/>
	);

	let books = [];
	books =
		currentBooks &&
		currentBooks.map((book, index) => {
			if (index >= page * 6) {
				return null;
			}
			return (
				<Grid item key={book.id} md={4} xs={4}>
					<Card className={classes.card}>
						<Button
							className={classes.mediaButton}
							size='small'
							color='primary'
							href={window.location.origin + `/book/${book.id}/${book.title}`}
							target='_blank'
						>
							<CardMedia
								className={classes.cardMedia}
								image={book.pictures[0].image}
								title={book.title + ' - ' + book.author}
							/>
						</Button>
						<CardContent className={classes.cardContent}>
							<Typography gutterBottom variant='h5' component='h1'>
								${book.price}
							</Typography>
							<Typography>{book.title + ' - ' + book.author}</Typography>
						</CardContent>
						<CardActions>
							<Button
								size='small'
								color='primary'
								onClick={() => detailButtonHandler(book.id, book.title)}
							>
								Details
							</Button>
							<Button size='small' color='primary'>
								Edit
							</Button>
						</CardActions>
					</Card>
				</Grid>
			);
		});

	return (
		<div className={classes.root}>
			<CssBaseline />
			{loading && <LinearProgress className={classes.progress} />}
			<Container className={classes.container}>
				<Grid
					container
					direction='row'
					justify='space-around'
					spacing={3}
					className={classes.grid}
				>
					<Grid item xs={3} className={classes.filter}>
						{filterBar}
					</Grid>
					<Grid container item xs={9} spacing={3}>
						<Grid item xs={12}>
							{searchBar}
						</Grid>
						{books}
						<Grid item xs={12}>
							{paginationBar}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Books;
