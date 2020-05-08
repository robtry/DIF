import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from '../util/axios';

export const useFetch = (path = '', extra = '') => {
	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data to export
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isSearching, setIsSearching ] = useState(false);
	const [ totalPages, setTotalPages ] = useState(0);
	const [ isLoadingPages, setIsLoadingPages ] = useState(true);

	//location for pags
	const location = useLocation();
	const history = useHistory();

	//data inside
	const [ currentPage, setCurrentPage ] = useState(new URLSearchParams(location.search).get('pag'));
	const [ currentUrl, setCurrentUrl ] = useState(location.pathname);

	useEffect(
		() => {
			setCurrentPage(new URLSearchParams(location.search).get('pag'));
			setCurrentUrl(location.pathname);
		},
		[ location ]
	);

	useEffect(
		() => {
			history.replace(currentUrl); //no page needed
		},
		[ extra, history, currentUrl ]
	);

	// do get request
	const loadData = useCallback(
		() => {
			console.log('axios getting:', path + '/' + extra + (currentPage == null ? '1' : currentPage) + '/');
			setIsLoading(true);
			setIsSearching(false);
			// setTimeout(() => {
			// 	if (isCurrent.current) {
			// 		setData((prev) => prev.concat('1'));
			// 		setIsLoading(false);
			// 	}
			// }, 500);
			axios
				.get(path + '/' + extra + (currentPage == null ? '1' : currentPage))
				.then((res) => {
					console.log(res.data);
					if (isCurrent.current) {
						setData(res.data);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log('axios loadData', err);
				});
		},
		[ currentPage, path, extra ]
	);

	// do post request
	const searchByName = useCallback((pathname, payload = {}) => {
		console.log('axios getting: ', pathname, payload);
		setIsSearching(true);
		setIsLoading(true);

		// setTimeout(() => {
		// 	if (isCurrent.current) {
		// 		setData((prev) => prev.concat('1'));
		// 		setIsLoading(false);
		// 	}
		// }, 200);
		axios
			.get(pathname, payload)
			.then((res) => {
				console.log('axios searchByName', res.data);
				if (isCurrent.current) {
					setData(res.data);
					setIsLoading(false);
				}
			})
			.catch((err) => console.log('axios searchByName:', err));
	}, []);

	const getTotalPages = useCallback(
		() => {
			console.log('axios pages: ', path + '/total');
			setIsLoadingPages(true);

			// setTimeout(() => {
			// 	if (isCurrent.current) {
			// 		setTotalPages(10);
			// 		setIsLoadingPages(false);
			// 	}
			// }, 800);
			axios
				.get(path + '/total')
				.then((res) => {
					//console.log('totals', res.data);
					setTotalPages(Math.ceil(res.data / 30));
					setIsLoadingPages(false);
				})
				.catch((err) => console.log(err));
		},
		[ path ]
	);

	// initial Load
	useEffect(
		() => {
			loadData();
			getTotalPages();
		},
		[ loadData, getTotalPages ]
	);

	// to avoid set state when it is gone
	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		};
	}, []);

	return { data, isLoading, loadData, searchByName, isSearching, totalPages, isLoadingPages };
};
