import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/TemplateTable';
import Copyright from '../../components/Copyright/index';
import New from '../../components/Modal/_CUModal';
import TemplateForm from '../../components/Forms/TemplateInitForm';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';

const Templates = () => {

	const { loadData, isLoading, data } = useFetch();

	return (
		<React.Fragment>
			<Header size="huge"> Plantillas </Header>
			<Copyright />
			<New message="Crear Plantilla" Form={TemplateForm} refresh={loadData} />
			<Pagination totalPages={data.length / 1}/>
			{isLoading ? <Loader /> : <Table data={data} loadData={loadData} />}
		</React.Fragment>
	);
}

export default Templates;