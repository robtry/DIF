import React, { useState, useEffect, useCallback } from 'react';
import { Header, Form } from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router-dom';
//own
import Table from '../../components/Tables/Users/UserTable';
import Copyright from '../../components/Copyright/index';
import New from '../../components/Forms/_CUModal';
import UserForm from '../../components/Forms/UserForm';
import Pagination from '../../components/Tables/_shared/Pagination';


const User = () => {

	//data
	const [data, setData] = useState([]);

	//location for pags
	const location = new URLSearchParams(useLocation().search).get('pag');
	const history = useHistory();

	// type of current table
	const [types, setTypes] = useState('all');

	const loadData = useCallback(() => {
		setData([]);
		console.log(
			'[index user.js] | Fetching users of type',
			types,
			'for page',
			location
		);
		setData(prev => prev.concat('1'));
	}, [types, location]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	const convertToHeader = abbreviateName => {
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
			<New message="Nuevo Usuario" Form={UserForm} refresh={loadData} />
			<Pagination totalPages={data.length / 1}/>
			<Form>
				<Form.Field width="5">
					<label> Usuarios </label>
					<select
						onChange={e => {
							setTypes(e.target.value);
							history.replace('usuarios');
						}}
						defaultValue={types}
					>
						<option value="all">Todos</option>
						<option value="admin">Administradores</option>
						<option value="medico">Médicos</option>
						<option value="abogado">Abagados</option>
						<option value="tsocial">Trabajadores Sociales</option>
						<option value="psicologo">Psicólogos</option>
					</select>
				</Form.Field>
			</Form>
			<Table data={data} loadData={loadData} />
		</React.Fragment>
	);
};

export default User;
