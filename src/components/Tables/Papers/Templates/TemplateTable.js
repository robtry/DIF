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
				<Table.HeaderCell>Título</Table.HeaderCell>
				<Table.HeaderCell>Categoría</Table.HeaderCell>
				<Table.HeaderCell>Formatos Llenados</Table.HeaderCell>
				<Table.HeaderCell>#</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>Derechos del NNA</Table.Cell>
				<Table.Cell>Legal</Table.Cell>
				<Table.Cell>14</Table.Cell>
				<CrudButton />
			</Table.Row>
		</Table.Body>
	</Table>
	<Pagination />
	</React.Fragment>
)

export default TemplateTable;