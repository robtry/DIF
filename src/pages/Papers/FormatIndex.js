import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/FormatTable';
import Copyright from '../../components/Copyright/index';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';

const Formats = () => {

	const { loadData, isLoading, data } = useFetch();

	return (
		<React.Fragment>
			<Header size="huge"> Formatos </Header>
			<Copyright />
			<Pagination totalPages={data.length / 1}/>
			{isLoading ? <Loader /> : <Table data={data} loadData={loadData} />}
		</React.Fragment>
	);
}

export default Formats;