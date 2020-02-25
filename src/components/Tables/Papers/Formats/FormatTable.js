import React from 'react';
import { Table }  from 'semantic-ui-react';

// own
import CrudButton from '../../_shared/CRUD_Button';
import Pagination from '../../_shared/Pagination';

/**
 * Es la tabla que se usa para el index de todos las plantillas
*/

const TemplateTable = () => (
	<React.Fragment>
	<Table striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Plantilla</Table.HeaderCell>
				<Table.HeaderCell>NNA</Table.HeaderCell>
				<Table.HeaderCell>Última edición</Table.HeaderCell>
				<Table.HeaderCell>Responsable</Table.HeaderCell>
				<Table.HeaderCell>Acciones sobre el formato</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>Derechos del NNA</Table.Cell>
				<Table.Cell>Juan</Table.Cell>
				<Table.Cell>14-02-19 12:34:15</Table.Cell>
				<Table.Cell> Pepe </Table.Cell>
				<CrudButton />
			</Table.Row>
		</Table.Body>
	</Table>
	<Pagination />
	</React.Fragment>
)

export default TemplateTable;