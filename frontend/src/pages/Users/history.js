import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/History/UserHistoryTable';
import Copyright from '../../components/Copyright/index';
import Pagination from '../../components/UI/Pagination';
import PaginationLoader from '../../components/Loader/PaginationLoader';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';
import { useRouteMatch } from 'react-router-dom';

const History = () => {
	const location = useRouteMatch();

	const { isLoading, data, totalPages, isLoadingPages } = useFetch('users/history', location.params.id + '/');

	return (
		<React.Fragment>
			<Header size="huge"> Historial </Header>
			<Copyright />
			{isLoadingPages ? <PaginationLoader /> :  totalPages > 1 && <Pagination totalPages={totalPages} />}
			{isLoading ? <Loader /> : <Table data={data} />}
		</React.Fragment>
	);
};

export default History;
