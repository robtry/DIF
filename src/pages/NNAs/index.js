import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/NNATable';
import Copyright from '../../components/Copyright/index';
import New from '../../components/Forms/_CUModal';
import NNAForm from '../../components/Forms/NNAForm';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader';
import { useFetch } from '../../util/useFetch';

const NNAPage = () => {

	const { loadData, isLoading, data } = useFetch();

	return (
		<React.Fragment>
			<Header size="huge"> NNA's </Header>
			<Copyright />
			<New message="Agregar NNA" Form={NNAForm} refresh={loadData} />
			<Pagination totalPages={data.length / 1}/>
			{isLoading ? <Loader /> : <Table data={data} loadData={loadData} />}
		</React.Fragment>
	);
};

export default NNAPage;
