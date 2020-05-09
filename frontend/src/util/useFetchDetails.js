import { useEffect, useState, useRef, useCallback } from 'react';
import axios from './axios';

export const useFetchDetails = (path) => {
	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ notFound, setNotFound ] = useState(false);

	const loadData = useCallback(
		() => {
			setIsLoading(true);
			console.log('getting', path);
			axios
				.get(path)
				.then((res) => {
					console.log(res.data);
					setIsLoading(false);
					setData(res.data);
				})
				.catch((err) => {
					console.log('fetching err', err);
					if (err.message.includes('status code 404')) {
						setNotFound(true);
					}
				});
		},
		[ path ]
	);

	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		};
	}, []);

	return { data, isLoading, loadData, notFound };
};
