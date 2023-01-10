import { useState, useEffect } from 'react'
import { create, insertBatch } from '@lyrasearch/lyra';
import { movies } from '../data/movies'


export const useMovieDB = () => {
	const [movieDB, setMovieDB] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const db = await create({
				schema: {
					title: 'string',
					director: 'string',
					plot: 'string',
					year: 'number',
					isFavorite: 'boolean'
				}
			});
			await insertBatch(db, movies, { batchSize: 500 });
			setMovieDB(db);
		}
		fetchData();
	}, []);
	return movieDB;
}