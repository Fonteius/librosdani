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

const Book = ({ match }) => {
	const dispatch = useDispatch();
	const [book, setBook] = useState(null);
	const classes = useStyles();
	const history = useHistory();
	const bookData = useSelector((state) => state.books.book);

	const {
		params: { bookId, title },
	} = match;

	const onFetchBook = useCallback(() => dispatch(actions.fetchBook(bookId)), [
		dispatch,
	]);

	useEffect(() => {
		onFetchBook();
	}, [onFetchBook]);

	useEffect(() => {
		setBook(bookData);
	}, [bookData]);

	let body = null;
	if (book === false) {
		body = <Redirect to='/books' />;
	} else if (book !== null) {
		body = (
			<div>
				<p>{book.title}</p>
			</div>
		);
	}

	// localhost:3000/book/-MHId5ert5BsFe7cWqic/test
	// localhost:3000/book/-MHIcj8Hbw6k92xAi76h/test

	return <div className={classes.root}>{body}</div>;
};

export default Book;
