import React, { useState } from 'react';
import { Header, Grid } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/TemplateTable';
import Copyright from '../../components/Copyright/index';
import New from '../../components/Modal/_CUModal';
import TemplateForm from '../../components/Forms/TemplateInitForm';
import Pagination from '../../components/UI/Pagination';
import PaginationLoader from '../../components/Loader/PaginationLoader';
import Loader from '../../components/Loader/UserLoader';
import { useFetch } from '../../util/useFetch';
import IndexSearch from '../../components/SearchBar/IndexSearch';
import NoRegs from '../../components/UI/NoRegs';
import UserTypes from '../../components/UI/UserTypes';

const Templates = () => {
	// type of current table
	const [ types, setTypes ] = useState('all');

	const { data, isLoading, loadData, totalPages, isLoadingPages, isSearching, searchByName } = useFetch(types + '/');

	return (
		<React.Fragment>
			<Header size="huge"> Plantillas </Header>
			<Copyright />

			<Grid stackable columns={2}>
				<Grid.Row>
					<Grid.Column>
						<New message="Crear Plantilla" Form={TemplateForm} refresh={loadData} />
					</Grid.Column>
					<Grid.Column>
						{isLoadingPages ? <PaginationLoader /> : !isSearching && <Pagination totalPages={totalPages} />}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column>
						<IndexSearch searcher={searchByName} type="template" reloader={loadData} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row />
			</Grid>

		<UserTypes setTypes={setTypes} type={types}/>

			<div style={{ marginTop: '30px' }} />
			{isLoading ? <Loader /> : data.length === 0 ? <NoRegs /> : <Table data={data} loadData={loadData} />}
		</React.Fragment>
	);
};

export default Templates;
