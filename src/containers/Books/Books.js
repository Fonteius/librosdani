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
	IconButton,
	Grid,
	Typography,
	Container,
	CssBaseline,
	FormLabel,
	Hidden,
	Select,
	Slider,
	MenuItem,
	TextField,
	LinearProgress,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Pagination, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {},
	filter: {},
	filterLabel: {
		padding: '5px 0px',
		margin: '0px 0px',
	},
	pagination: {
		justifyContent: 'center',
	},
	formControl: {
		margin: theme.spacing(0),
	},
	container: {
		width: '100vw',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
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
		height: '55px',
		[theme.breakpoints.down('xs')]: {
			height: '40px',
		},
	},
	searchField: {
		[theme.breakpoints.down('xl')]: {
			width: '50%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '40%',
		},
	},
	filterIcon: {
		height: '40px',
		width: '40px',
	},
	progress: {
		width: '100vw',
	},
}));

const Books = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm();
	const theme = useTheme();
	const matchesXsDown = useMediaQuery(theme.breakpoints.down('xs'));

	const [currentBooks, setCurrentBooks] = useState();
	const [orderedBooks, setOrderedBooks] = useState();
	const [search, setSearch] = useState('');
	const [order, setOrder] = useState(0);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [pageLimit, setPageLimit] = useState(6);
	const [paginationSize, setPaginationSize] = useState('large');
	const [priceSliderValue, setPriceSliderValue] = useState([0, 100]);
	const [priceSliderBase] = useState(20);

	const priceSliderMarks = [
		{
			value: 0,
			label: '$0',
		},
		{
			value: 100,
			label: `$${priceSliderBase * 100}`,
		},
	];

	const allBooks = useSelector((state) => state.books);
	const loading = useSelector((state) => state.books.loading);

	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);

	const filterBooks = useCallback(() => {
		const priceSlideFilter = allBooks.books.filter((item) => {
			if (
				item.price >= priceSliderValue[0] * priceSliderBase &&
				item.price <= priceSliderValue[1] * priceSliderBase
			) {
				return true;
			} else {
				return false;
			}
		});
		const searchResult = priceSlideFilter.filter(
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
			case 4:
				orderedBooks = searchResult.sort((a, b) => {
					return a.year - b.year;
				});
				break;
			case 5:
				orderedBooks = searchResult.sort((a, b) => {
					return b.year - a.year;
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
	}, [
		allBooks.books,
		page,
		pageLimit,
		search,
		order,
		priceSliderValue,
		priceSliderBase,
	]);

	useEffect(() => {
		onFetchBooks();
	}, [onFetchBooks]);

	useEffect(() => {
		setPage(1);
	}, [order, search, priceSliderValue]);

	useEffect(() => {
		filterBooks();
	}, [filterBooks]);

	useEffect(() => {
		if (matchesXsDown) {
			setPageLimit(4);
			setPaginationSize('small');
		} else {
			setPageLimit(6);
			setPaginationSize('large');
		}
	}, [matchesXsDown]);

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

	const priceSliderHandler = (event, newValue) => {
		setPriceSliderValue(newValue);
	};

	const priceSliderLabelHandler = (value) => {
		return `$${value * priceSliderBase}`;
	};

	let filterBar = (
		// <FormControl component='fieldset'>
		// 	<FormLabel component='legend'>FILTRAR POR:</FormLabel>
		// 	<FormGroup aria-label='position' row>
		// 		<FormControlLabel
		// 			value='end'
		// 			control={<Checkbox color='primary' />}
		// 			label='Precio'
		// 			labelPlacement='end'
		// 		/>
		// 	</FormGroup>
		// 	<FormLabel component='legend'>ORDENAR POR:</FormLabel>
		// 	<Select
		// 		id='order'
		// 		label='Order'
		// 		labelId='order'
		// 		name='order'
		// 		value={order}
		// 		onChange={(e) => orderSelectionHandler(e)}
		// 	>
		// 		<MenuItem value={0}>Titulo : A-Z</MenuItem>
		// 		<MenuItem value={1}>Titulo : Z-A</MenuItem>
		// 		<MenuItem value={2}>Precio : Menor a Mayor</MenuItem>
		// 		<MenuItem value={3}>Precio : Mayor a Menor</MenuItem>
		// 		<MenuItem value={4}>Año : Menor a Mayor</MenuItem>
		// 		<MenuItem value={5}>Año : Mayor a Menor</MenuItem>
		// 	</Select>
		// 	<FormLabel component='legend'>
		// 		RESULTADOS: {orderedBooks ? orderedBooks.length : null}
		// 	</FormLabel>
		// </FormControl>
		<div>
			<CssBaseline />
			<FormLabel component='legend' className={classes.filterLabel}>
				ORDENAR POR:
			</FormLabel>
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
			<FormLabel component='legend' className={classes.filterLabel}>
				PRECIO:
			</FormLabel>
			<Slider
				value={priceSliderValue}
				onChange={priceSliderHandler}
				valueLabelDisplay='auto'
				getAriaValueText={priceSliderLabelHandler}
				valueLabelFormat={priceSliderLabelHandler}
				aria-labelledby='price-range-slider'
				marks={priceSliderMarks}
				style={{ width: 125 }}
			/>
			<FormLabel component='legend' className={classes.filterLabel}>
				RESULTADOS: {orderedBooks ? orderedBooks.length : null}
			</FormLabel>
		</div>
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
				size={matchesXsDown ? 'small' : 'medium'}
				className={classes.searchField}
				inputRef={register({
					maxLength: { value: 60, message: 'Max 60 Characters.' },
				})}
			/>
			{errors.search && (
				<Alert variant='outlined' severity='error'>
					{errors.search.message}
				</Alert>
			)}
			<Button
				type='submit'
				variant='outlined'
				color='primary'
				size='small'
				className={classes.submitSearch}
			>
				Search
			</Button>
			<Hidden smUp>
				<IconButton
					color='primary'
					size='small'
					className={classes.filterIcon}
					// onClick={() => console.log('Test')}
				>
					<Menu style={{ fontSize: 35 }} />
				</IconButton>
			</Hidden>
		</form>
	);

	let paginationBar = (
		<Pagination
			count={totalPages}
			page={page}
			variant='outlined'
			shape='rounded'
			onChange={pageHandler}
			size={paginationSize}
			siblingCount={0}
			classes={{ ul: classes.pagination }}
		/>
	);

	let books = [];
	books =
		currentBooks &&
		currentBooks.map((book, index) => {
			if (index >= page * pageLimit) {
				return null;
			}
			return (
				<Grid item key={book.id} md={4} xs={window.innerWidth < 600 ? 6 : 12}>
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
					spacing={window.innerWidth < 600 ? 0 : 3}
					className={classes.grid}
				>
					<Hidden xsDown>
						<Grid item xs={3} className={classes.filter}>
							{filterBar}
						</Grid>
					</Hidden>
					<Grid
						container
						item
						xs={window.innerWidth < 600 ? 12 : 9}
						spacing={window.innerWidth < 600 ? 0 : 3}
					>
						<Grid item xs={12}>
							{searchBar}
						</Grid>
						<Grid item xs={12}>
							{paginationBar}
						</Grid>
						{books}
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Books;
