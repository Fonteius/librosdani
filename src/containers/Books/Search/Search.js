import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Input } from '@material-ui/core';
import * as actions from '../../../store/actions/index';

const Search = React.memo(() => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState('');
	const isLoading = useSelector((state) => state.books.loading);
	const idToken = useSelector((state) => state.auth.idToken);
	const filterRef = useRef();
	const onFetchBooks = useCallback(
		(query, idToken) => dispatch(actions.fetchBooks(query, idToken)),
		[dispatch]
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (filter === filterRef.current.value) {
				const query =
					filter.length === 0 ? '' : `orderBy="title"&startAt="${filter}"`;
				onFetchBooks(query, idToken);
			}
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [filter, filterRef, onFetchBooks, idToken]);

	return (
		<Card>
			<div>
				<label>Search : </label>
				<Input
					inputRef={filterRef}
					type='text'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
				{isLoading && <span>Loading...</span>}
			</div>
		</Card>
	);
});

export default Search;
