import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/History/UserHistoryTable';
import Copyright from '../../components/Copyright/index';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';
import { useLocation } from 'react-router-dom';

const History = () => {
	const location = useLocation();
	const [ userId, setUserId ] = useState(location.pathname.replace('/historial/', ''));

	useEffect(
		() => {
			//console.log(location.pathname.replace('/historial/',''))
			setUserId(location.pathname.replace('/historial/', ''));
		},
		[ location ]
	);

	const { isLoading, data } = useFetch('users/history', userId + '/');

	return (
		<React.Fragment>
			<Header size="huge"> Historial de |nombre| </Header>
			<Copyright />
			<Pagination totalPages={data.length / 1} />
			{isLoading ? <Loader /> : <Table data={data} />}
		</React.Fragment>
	);
};

export default History;
