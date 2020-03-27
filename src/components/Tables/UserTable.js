import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// own
import CrudButton from './_shared/RUD_Button';
import UserForm from '../Forms/UserForm';

/**
 * Es la tabla que se usa para el index de todos los usuarios
 */

const UserTable = props => {
	const convertToIcon = abbreviateName => {
		switch (abbreviateName) {
			case 'admin':
				return 'address card';
			case 'medico':
				return 'doctor';
			case 'abogado':
				return 'law';
			case 'tsocial':
				return 'user';
			case 'psicologo':
				return 'user outline';
			default:
				console.log('[UserTable.js]: No icon for this user');
		}
	};

	return (
		<Table celled padded>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Nombre</Table.HeaderCell>
					<Table.HeaderCell>Tipo</Table.HeaderCell>
					<Table.HeaderCell>Hisotrial</Table.HeaderCell>
					<Table.HeaderCell>#</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Nombre con Apellido y</Table.Cell>
					<Table.Cell>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Table.Cell>
					<Table.Cell>
						<NavLink to="/historial/1" exact>
							Ir al historial
						</NavLink>
					</Table.Cell>
					<CrudButton
						id="1"
						onDelete="John Lilki"
						onEdit={UserForm}
						refresh={props.loadData}
					/>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};

UserTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default UserTable;
