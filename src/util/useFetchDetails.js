import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useFetchDetails = (id) => {

	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	//location for pags
	const currentUrl = useLocation().pathname;

	const loadData = useCallback(() => {
		//setData([]); //causes more renders, unneeded
		setIsLoading(true);
		console.log(
			'Fetching ',
			currentUrl,
			'/', id
		);
		setTimeout(()=>{
			if(isCurrent.current){
				setData(prev => prev.concat('1'));
				setIsLoading(false);
			}
		}, 700)
	}, [currentUrl, id]);


	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		}
	}, []);

	return { data, isLoading, loadData };
}