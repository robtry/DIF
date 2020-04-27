import React, { useState } from 'react';
import { Header, Form, Grid } from 'semantic-ui-react';
//import { useLocation, useHistory } from 'react-router-dom';
//own
import Table from '../../components/Tables/UserTable';
import Copyright from '../../components/Copyright/index';
import New from '../../components/Modal/_CUModal';
import UserForm from '../../components/Forms/UserForm';
import Pagination from '../../components/UI/Pagination';
import PaginationLoader from '../../components/Loader/PaginationLoader';
import Loader from '../../components/Loader/UserLoader';
import { useFetch } from '../../util/useFetch';
import IndexSearch from '../../components/SearchBar/IndexSearch';
import NoRegs from '../../components/UI/NoRegs';

const UserPage = () => {
	// type of current table
	const [ types, setTypes ] = useState('all');

	const { data, isLoading, loadData, totalPages, isLoadingPages, isSearching, searchByName } = useFetch(types + '/');

	const convertToHeader = (abbreviateName) => {
		switch (abbreviateName) {
			case 'admin':
				return 'Administradores';
			case 'medico':
				return 'Médicos';
			case 'abogado':
				return 'Abagados';
			case 'tsocial':
				return 'Trabajadores Sociales';
			case 'psicologo':
				return 'Psicólogos';
			case 'all':
				return 'Todos los usuarios';
			default:
				return 'Error, checar los argumentos';
		}
	};

	return (
		<React.Fragment>
			<Header size="huge"> {convertToHeader(types)} </Header>
			<Copyright />

			<Grid stackable columns={2}>
				<Grid.Row>
					<Grid.Column>
						<New message="Nuevo Usuario" Form={UserForm} refresh={loadData} />
					</Grid.Column>
					<Grid.Column>
						{isLoadingPages ? <PaginationLoader /> : !isSearching && <Pagination totalPages={totalPages} />}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column>
						<IndexSearch searcher={searchByName} type="user" reloader={loadData} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row />
			</Grid>

			<Form>
				<Form.Field width="5">
					<label> Usuarios </label>
					<select
						onChange={(e) => {
							setTypes(e.target.value);
						}}
						defaultValue={types}
					>
						<option value="all">Todos</option>
						<option value="admin">Administradores</option>
						<option value="medico">Médicos</option>
						<option value="juridico">Jurídicos</option>
						<option value="tsocial">Trabajadores Sociales</option>
						<option value="psicologo">Psicólogos</option>
						<option value="pedagogico">Pedagógicos</option>
					</select>
				</Form.Field>
			</Form>
			<div style={{ marginTop: '30px' }} />
			{isLoading ? <Loader /> : data.length === 0 ? <NoRegs /> : <Table data={data} loadData={loadData} />}
		</React.Fragment>
	);
};

export default UserPage;
