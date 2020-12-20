import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	CssBaseline,
	Container,
} from '@material-ui/core';
import Search from '../Search/Search';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		display: 'flex',
		textAlign: 'center',
		flexGrow: 1,
		zIndex: 1300,
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	media: {
		paddingTop: '56.25%', // 16:9
		height: '100%',
		width: '100%',
	},
	content: {
		flexGrow: 1,
	},
	mediaButton: {
		padding: 0,
		margin: 0,
	},
	search: {
		marginRight: '3vh',
	},
}));

const Results = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();

	const allBooks = useSelector((state) => state.books);

	const onFetchBooks = useCallback(() => dispatch(actions.fetchBooks()), [
		dispatch,
	]);
	const onRemoveBook = (bookId) => dispatch(actions.removeBook(bookId));

	useEffect(() => {
		onFetchBooks();
	}, [onFetchBooks]);

	const detailButtonHandler = (id, title) => {
		history.push(`/book/${id}/${title}`);
	};

	const removeButtonHandler = (bookId) => {
		onRemoveBook(bookId);
	};

	let books = [];
	books = allBooks.books.map((book) => (
		<Grid key={book.id} item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<Button
					className={classes.mediaButton}
					size='small'
					color='primary'
					href={window.location.origin + `/book/${book.id}/${book.title}`}
					target='_blank'
				>
					<CardMedia className={classes.media} image={book.pictures[0].image} />
				</Button>
				<CardContent className={classes.content}>
					<Typography gutterBottom variant='h6' component='h2'>
						{book.title}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						${book.price}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						size='small'
						color='primary'
						onClick={() => detailButtonHandler(book.id, book.title)}
					>
						Details
					</Button>
					<Button
						size='small'
						color='primary'
						onClick={() => removeButtonHandler(book.id)}
					>
						Remove
					</Button>
				</CardActions>
			</Card>
		</Grid>
	));

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Container>
				<Grid container direction='column' spacing={3}>
					<Grid key='search' item>
						<Typography variant='h5'>Book List</Typography>
						<Search />
					</Grid>
					<Grid key='contents' item>
						<Grid container spacing={3}>
							{books}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Results;
