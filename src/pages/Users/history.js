import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/History/UserHistoryTable';
import Copyright from '../../components/Copyright/index';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';

const History = () => {

	const { isLoading, data } = useFetch();

	return (
		<React.Fragment>
			<Header size="huge"> Historial de |nombre| </Header>
			<Copyright />
			<Pagination totalPages={data.length / 1}/>
			{isLoading ? <Loader /> : <Table data={data} />}
		</React.Fragment>
	);
}

export default History;