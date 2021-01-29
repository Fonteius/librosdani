import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
	makeStyles,
	CardActionArea,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	CssBaseline,
	Container,
} from '@material-ui/core';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		zIndex: 1300,
		textAlign: 'center',
		paddingTop: theme.spacing(3),
		width: '100vw',
	},
	card: {
		flexGrow: 1,
	},
	media: {
		height: '55vh',
		width: '80vh',
		[theme.breakpoints.down('md')]: {
			height: '35vh',
			width: '35vh',
		},
		[theme.breakpoints.down('sm')]: {
			height: '20vh',
			width: '20vh',
		},
		[theme.breakpoints.down('xs')]: {
			height: '20vh',
			width: '20vh',
		},
	},
	thumb: {
		height: '8vh',
		width: '8vh',
		paddingLeft: '0',
		[theme.breakpoints.down('md')]: {
			height: '4vh',
			width: '4vh',
		},
		[theme.breakpoints.down('sm')]: {
			height: '2vh',
			width: '2vh',
		},
		[theme.breakpoints.down('xs')]: {
			height: '2vh',
			width: '2vh',
		},
	},
	mediaButton: {
		padding: 0,
		margin: 0,
	},
	pictures: {
		display: 'inline-flex',
		padding: '5px 0px',
	},
	submit: {
		margin: theme.spacing(1),
		width: '40vh',
	},
}));

const Book = ({ match }) => {
	const dispatch = useDispatch();
	const [book, setBook] = useState(null);
	const [mainPicture, setMainPicture] = useState();
	const classes = useStyles();
	// const history = useHistory();
	const bookData = useSelector((state) => state.books.book);

	const {
		params: { bookId },
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
				<Grid item xs={7}>
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
					<Grid item xs={12} className={classes.pictures}>
						{book.pictures.map((picture) => (
							<CardActionArea
								key={picture.name}
								onClick={() => pictureChangeHandler(picture.image)}
							>
								<CardMedia className={classes.thumb} image={picture.thumb} />
							</CardActionArea>
						))}
					</Grid>
					<CardContent>
						<Typography gutterBottom variant='h6' component='h2'>
							Titulo : {book.title}
						</Typography>
						<Typography gutterBottom variant='h6' component='h2'>
							Autor : {book.author}
						</Typography>
						<Typography gutterBottom variant='h6' component='h2'>
							Editorial : {book.editorial}
						</Typography>
						<Typography gutterBottom variant='h6' component='h2'>
							Año : {book.year}
						</Typography>
					</CardContent>
				</Grid>
				<Grid item xs={4}>
					<Typography gutterBottom variant='h6' component='h2'>
						{book.title} - {book.author}
					</Typography>
					<Typography gutterBottom variant='h6' component='h2'>
						${book.price}
					</Typography>
					<Typography gutterBottom variant='h6' component='h2'>
						Mar del Plata
					</Typography>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Contacto
					</Button>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Añadir a Favoritos
					</Button>
				</Grid>
			</Grid>
		);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			{body ? <Container maxWidth={false}>{body}</Container> : null}
		</div>
	);
};

export default Book;
