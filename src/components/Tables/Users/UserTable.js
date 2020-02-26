import React from 'react';
import { Table }  from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
// own
import CrudButton from '../_shared/CRUD_Button';
import Pagination from '../_shared/Pagination';

/**
 * Es la tabla que se usa para el index de todos los usuarios
*/

const UserTable = () => (
	<React.Fragment>
	<Table striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>NSS</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Hisotrial</Table.HeaderCell>
				<Table.HeaderCell>#</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>John Lilki</Table.Cell>
				<Table.Cell>September 14, 2013</Table.Cell>
				<Table.Cell> <NavLink to='/historial/1' exact> Ir al historial </NavLink> </Table.Cell>
				<CrudButton />
			</Table.Row>
		</Table.Body>
	</Table>
	<Pagination />
	</React.Fragment>
)

export default UserTable;