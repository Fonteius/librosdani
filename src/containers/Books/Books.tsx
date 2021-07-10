import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { booksSelector, isBookLoadingSelector, tagsSelector } from 'src/store/rootSelector';
import { ITheme } from 'src/types/theme';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Drawer,
	IconButton,
	Grid,
	Typography,
	Container,
	CssBaseline,
	FormLabel,
	FormControl,
	Hidden,
	Select,
	Slider,
	MenuItem,
	TextField,
	InputLabel,
	LinearProgress,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Pagination, Alert, Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'src/store/actions/index';

const useStyles = makeStyles((theme: ITheme) => ({
	root: {},
	drawer: {
		color: 'green !important',
		flexShrink: 0,
		width: theme.drawer.width,
		overflow: 'auto',
	},
	drawerPaper: {
		background: '#263238',
		width: theme.drawer.width,
		color: '#ccc',
	},
	filter: {
		[theme.breakpoints.up('xs')]: {
			width: '100%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			padding: '15px 15%',
		},
	},
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
	image: {
		height: '18vh',
		width: 'auto',
	},
	mediaButton: {
		padding: 0,
		margin: 0,
	},
	cardContent: {
		flexGrow: 1,
		paddingBottom: theme.spacing(1),
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

	const [currentBooks, setCurrentBooks] = useState<any>();
	const [orderedBooks, setOrderedBooks] = useState<any>();
	const [drawer, setDrawer] = useState(false);
	const [search, setSearch] = useState<string>('');
	const [order, setOrder] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>();
	const [pageLimit, setPageLimit] = useState<number>(6);
	const [paginationSize, setPaginationSize] = useState<"medium" | "large" | "small" | undefined>('large');
	const [priceSliderValue, setPriceSliderValue] = useState<number[]>([0, 100]);
	const [priceSliderBase] = useState<number>(30);
	const [selectedTags, setSelectedTags] = useState([]);

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

	const allBooks = useSelector(booksSelector);
	const loading = useSelector(isBookLoadingSelector);
	const tags = useSelector(tagsSelector);

	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);

	const onFetchTags = useCallback(() => dispatch(actions.fetchTags()), [
		dispatch,
	]);

	const filterBooks = useCallback(() => {
		const priceSlideFilter = allBooks.books.filter((item: any) => {
			if (
				item.price >= priceSliderValue[0] * priceSliderBase &&
				item.price <= priceSliderValue[1] * priceSliderBase
			) {
				return true;
			} else {
				return false;
			}
		});

		let tagsFilter = [];
		if (selectedTags.length !== 0) {
			tagsFilter = priceSlideFilter.filter((item: any) => {
				if (item.tags) {
					let tags: any[] = [];
					item.tags.forEach((tag: any) => tags.push(tag.id));
					if (
						selectedTags.filter((selected: any) => {
							if (
								tags.filter((tagId) => {
									if (tagId === selected.id) {
										return true;
									} else {
										return false;
									}
								}).length !== 0
							) {
								return true;
							} else {
								return false;
							}
						}).length !== 0
					) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			});
		}

		const searchResult = (selectedTags.length !== 0
			? tagsFilter
			: priceSlideFilter
		).filter(
			(item: any) =>
				(item.title.toLowerCase() + ' ' + item.author.toLowerCase()).indexOf(
					search.toString().toLowerCase()
				) >= 0
		);

		const totalPages = Math.ceil(searchResult.length / pageLimit);

		let orderedBooks = [];
		switch (order) {
			case 0:
				orderedBooks = searchResult.sort((a: any, b: any) => {
					return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
				});
				break;
			case 1:
				orderedBooks = searchResult.sort((a: any, b: any) => {
					return a.title > b.title ? -1 : b.title > a.title ? 1 : 0;
				});
				break;
			case 2:
				orderedBooks = searchResult.sort((a: any, b: any) => {
					return a.price - b.price;
				});
				break;
			case 3:
				orderedBooks = searchResult.sort((a: any, b: any) => {
					return b.price - a.price;
				});
				break;
			case 4:
				orderedBooks = searchResult.sort((a: any, b: any) => {
					return a.year - b.year;
				});
				break;
			case 5:
				orderedBooks = searchResult.sort((a: any, b: any) => {
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
		selectedTags,
	]);

	useEffect(() => {
		onFetchBooks();
		onFetchTags();
	}, [onFetchBooks, onFetchTags]);

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

	const detailButtonHandler = (id: any, title: any) => {
		history.push(`/book/${id}/${title}`);
	};

	const searchHandler = (data: any) => {
		setSearch(data.search);
	};

	const orderSelectionHandler = (e: any) => {
		setOrder(e.target.value);
	};

	const pageHandler = (e: any, value: any) => {
		setPage(value);
	};

	const priceSliderHandler = (event: any, newValue: any) => {
		setPriceSliderValue(newValue);
	};

	const priceSliderLabelHandler = (value: any) => {
		return `$${value * priceSliderBase}`;
	};

	const tagsInputHandler = (value: any) => {
		setSelectedTags(value);
	};

	const capitalizeText = (text: any) => {
		return text.replace(/\w\S*/g, (w: any) =>
			w.replace(/^\w/, (c: string) => c.toUpperCase())
		);
	};

	const toggleDrawerHandler = () => {
		setDrawer(!drawer);
	};

	let filterBar = (
		<div className={classes.filter}>
			<CssBaseline />
			<FormLabel component='legend' className={classes.filterLabel}>
				ORDENAR POR:
			</FormLabel>
			<FormControl variant='outlined' fullWidth style={{ margin: '15px 0px' }}>
				<InputLabel id='order'>Filtro</InputLabel>
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
			</FormControl>
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
				style={{ margin: '15px 0' }}
			/>
			<FormLabel component='legend' className={classes.filterLabel}>
				GENERO:
			</FormLabel>
			<Autocomplete
				style={{ textTransform: 'capitalize', margin: '15px 0' }}
				multiple
				fullWidth
				id='tags'
				value={selectedTags}
				options={tags.sort((a: any, b: any) => {
					return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
				})}
				getOptionLabel={(tags: any) => capitalizeText(tags.title)}
				filterSelectedOptions
				renderInput={(params) => (
					<TextField
						{...params}
						variant='outlined'
						label='Tags'
						placeholder='Genero'
					/>
				)}
				onChange={(e, newValue) => tagsInputHandler(newValue)}
			/>
			<FormLabel component='legend' className={classes.filterLabel}>
				LOCALIDAD:
			</FormLabel>
			<Typography style={{ margin: '15px 0' }}>Mar del Plata</Typography>
			<FormLabel component='legend' className={classes.filterLabel}>
				RESULTADOS: {orderedBooks ? orderedBooks.length : null}
			</FormLabel>
		</div>
	);

	let searchBar = (
		<form
			className={classes.formControl}
			noValidate
			onSubmit={handleSubmit((data) => searchHandler(data))}
		>
			<TextField
				id='search'
				label='Buscar'
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
				Buscar
			</Button>
			<Hidden smUp>
				<IconButton
					color='primary'
					size='small'
					className={classes.filterIcon}
					onClick={toggleDrawerHandler}
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

	let books: any[] = [];
	books =
		currentBooks ?
			currentBooks.map((book: any, index: any) => {
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
									classes={{ root: classes.image }}
									image={book.pictures[0].image}
									title={book.title + ' - ' + book.author}
									component='img'
								/>
							</Button>
							<CardContent className={classes.cardContent}>
								<Typography variant='h5' component='h1'>
									${book.price}
								</Typography>
								<Typography>{book.title + ' - ' + book.author}</Typography>
							</CardContent>
							<CardActions style={{ padding: '0px 10px' }}>
								<Button
									size='small'
									color='primary'
									onClick={() => detailButtonHandler(book.id, book.title)}
								>
									Detalles
								</Button>
							</CardActions>
						</Card>
					</Grid>
				);
			}) : null;

	const container = window !== undefined ? window.document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			{loading && <LinearProgress className={classes.progress} />}
			<Container className={classes.container}>
				<Hidden xsUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor='left'
						className={classes.drawer}
						classes={{ paper: classes.drawerPaper }}
						open={drawer}
						onClose={toggleDrawerHandler}
					>
						{filterBar}
					</Drawer>
				</Hidden>
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
