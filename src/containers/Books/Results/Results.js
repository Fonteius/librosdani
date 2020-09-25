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
} from '@material-ui/core';
import Search from '../Search/Search';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: '60px',
		marginLeft: '250px',
		marginRight: '50px',
		padding: '20px 20px',
		width: '80vw',
		textAlign: 'center',
		flexGrow: 1,
		zIndex: 1300,
	},
	card: {
		flexGrow: 1,
	},
	media: {
		height: 200,
		width: 200,
	},
	mediaButton: {
		padding: 0,
		margin: 0,
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
		<Grid key={book.id} item>
			<Grid item>
				<Card className={classes.card}>
					<CardActionArea>
						<Button
							className={classes.mediaButton}
							size='small'
							color='primary'
							href={window.location.origin + `/book/${book.id}/${book.title}`}
							target='_blank'
						>
							<CardMedia
								className={classes.media}
								image={book.pictures[0].image}
							/>
						</Button>
						<CardContent>
							<Typography gutterBottom variant='h6' component='h2'>
								{book.title}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								${book.price}
							</Typography>
						</CardContent>
					</CardActionArea>
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
		</Grid>
	));

	return (
		<div className={classes.root}>
			<Grid container direction='column' spacing={3}>
				<Grid key='search' item>
					<Typography variant='h5'>Book List</Typography>
					<Search />
				</Grid>
				<Grid key='contents' item>
					<Grid container direction='row' spacing={3} justify={'space-evenly'}>
						{books}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Results;
