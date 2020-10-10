import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
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
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		zIndex: 1300,
		textAlign: 'center',
		marginTop: '60px',
		padding: '20px 20px',
		[theme.breakpoints.down('xl')]: {
			marginLeft: '250px',
			marginRight: '50px',
			width: '80vw',
		},
		[theme.breakpoints.down('lg')]: {
			width: '75vw',
		},
		[theme.breakpoints.down('md')]: {
			marginTop: '60px',
			marginLeft: '2px',
			marginRight: '2px',
			padding: '20px 10px',
			width: '95vw',
		},
	},
	card: {
		flexGrow: 1,
	},
	media: {
		height: '65vh',
		width: '65vh',
		[theme.breakpoints.down('md')]: {
			height: '55vh',
			width: '55vh',
		},
		[theme.breakpoints.down('sm')]: {
			height: '35vh',
			width: '35vh',
		},
	},
	thumb: {
		height: '8vh',
		width: '8vh',
		paddingLeft: '0',
	},
	mediaButton: {
		padding: 0,
		margin: 0,
	},
}));

const Book = ({ match }) => {
	const dispatch = useDispatch();
	const [book, setBook] = useState(null);
	const [mainPicture, setMainPicture] = useState();
	const classes = useStyles();
	const history = useHistory();
	const bookData = useSelector((state) => state.books.book);

	const {
		params: { bookId, title },
	} = match;

	const onFetchBook = useCallback(() => dispatch(actions.fetchBook(bookId)), [
		dispatch,
		bookId,
	]);

	useEffect(() => {
		onFetchBook();
	}, [onFetchBook]);

	useEffect(() => {
		setBook(bookData);
	}, [bookData]);

	useEffect(() => {
		if (book !== null) {
			setMainPicture(book.pictures[0].image);
		}
	}, [book]);

	const pictureChangeHandler = (picture) => {
		setMainPicture(picture);
	};

	let body = null;
	if (book === false) {
		body = <Redirect to='/books' />;
	} else if (book !== null) {
		body = (
			<Grid container direction={'row'} spacing={0} justify={'space-evenly'}>
				<Grid item xs={1}>
					{book.pictures.map((picture) => (
						<CardActionArea
							key={picture.name}
							onClick={() => pictureChangeHandler(picture.image)}
						>
							<CardMedia className={classes.thumb} image={picture.thumb} />
						</CardActionArea>
					))}
				</Grid>
				<Grid item xs={9}>
					<CardActionArea>
						<Button
							className={classes.mediaButton}
							size='small'
							color='primary'
							href={mainPicture}
							target='_blank'
							component='a'
						>
							<CardMedia
								className={classes.media}
								image={mainPicture}
								component='div'
							/>
						</Button>
					</CardActionArea>
					<CardContent>
						<Typography gutterBottom variant='h6' component='h2'>
							Title : {book.title}
						</Typography>
						<Typography gutterBottom variant='h6' component='h2'>
							Author : {book.author}
						</Typography>
						<Typography gutterBottom variant='h6' component='h2'>
							Editorial : {book.editorial} | Year : {book.year}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							Price : ${book.price}
						</Typography>
					</CardContent>
				</Grid>
				<Grid item xs={2}>
					<CardContent>
						<Typography gutterBottom variant='h6' component='h2'>
							{book.title} - {book.author}
						</Typography>
					</CardContent>
					<CardContent>
						<Typography gutterBottom variant='h6' component='h2'>
							${book.price}
						</Typography>
					</CardContent>
				</Grid>
			</Grid>
		);
	}

	// localhost:3000/book/-MHId5ert5BsFe7cWqic/test
	// localhost:3000/book/-MHIcj8Hbw6k92xAi76h/test

	return (
		<div className={classes.root}>
			<Card className={classes.card}>{body}</Card>
		</div>
	);
};

export default Book;
