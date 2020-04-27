import React, { useState } from 'react';
import { Header, Grid, Form } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/FormatTable';
import Copyright from '../../components/Copyright/index';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';
import IndexSearch from '../../components/SearchBar/IndexSearch';
import NoRegs from '../../components/UI/NoRegs';
import PaginationLoader from '../../components/Loader/PaginationLoader';

const Formats = () => {
	// type of current table
	const [ types, setTypes ] = useState('all');

	const { data, isLoading, loadData, totalPages, isLoadingPages, isSearching, searchByName } = useFetch(types + '/');

	return (
		<React.Fragment>
			<Header size="huge"> Formatos </Header>
			<Copyright />

			<Grid stackable columns={2}>
				<Grid.Row>
					<Grid.Column/>
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

			<Form>
				<Form.Field width="5">
					<label> Formatos </label>
					<select
						onChange={(e) => {
							setTypes(e.target.value);
						}}
						defaultValue={types}
					>
						<option value="all">Todas</option>
						<option value="medico">Médico</option>
						<option value="juridico">Jurídico</option>
						<option value="tsocial">Trabajo Social</option>
						<option value="psicologo">Psicológico</option>
						<option value="pedagogico">Pedagógico</option>
					</select>
				</Form.Field>
			</Form>
			<div style={{ marginTop: '30px' }} />

			{isLoading ? <Loader /> : data.length === 0 ? <NoRegs /> : <Table data={data} loadData={loadData} />}

			<div style={{ marginBottom: '150px' }} />
		</React.Fragment>
	);
};

export default Formats;
