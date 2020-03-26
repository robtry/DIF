import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const useFetch = (extra) => {

	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	//location for pags
	const location = useLocation();
	const currentPage = new URLSearchParams(location.search).get('pag');
	const currentUrl = location.pathname;
	const history = useHistory();

	const loadData = useCallback(() => {
		//setData([]);
		setIsLoading(true);
		console.log(
			'Fetching ',
			currentUrl, extra ? extra : '' ,currentPage,
			
		);
		setTimeout(()=>{
			if(isCurrent.current){
				setData(prev => prev.concat('1'));
				setIsLoading(false);
			}
		}, 3000)
	}, [currentPage, currentUrl, extra]);

	useEffect(() => {
		history.replace(currentUrl);
	}, [extra, history, currentUrl])

	useEffect(() => {
		loadData();
	}, [loadData]);

	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		}
	}, []);

	return { data, isLoading, loadData };
}