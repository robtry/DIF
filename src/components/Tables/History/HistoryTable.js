import React from 'react';
import { Table }  from 'semantic-ui-react';

// own
import Pagination from '../_shared/Pagination';

/**
 * Es la tabla que se usa para el index de el historial
*/

const TemplateTable = () => (
	<React.Fragment>
	<Table striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Plantilla</Table.HeaderCell>
				<Table.HeaderCell>NNA</Table.HeaderCell>
				<Table.HeaderCell>Fecha</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>Derechos del NNA</Table.Cell>
				<Table.Cell>Juan</Table.Cell>
				<Table.Cell>14-02-19 12:34:15</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
	<Pagination />
	</React.Fragment>
)

export default TemplateTable;