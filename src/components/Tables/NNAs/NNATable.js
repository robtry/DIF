import React from 'react';
import { Table } from 'semantic-ui-react';
// own
import Formats from './AccordionFormats/AccordionFormats';
import CrudButton from '../_shared/RUD_Button';
import Pagination from '../_shared/Pagination';

/**
 * Es la tabla que se muestra los NNAs
*/

const NNATable = () => (
	<React.Fragment>
	<Table celled padded>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Expediente</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Formatos</Table.HeaderCell>
				<Table.HeaderCell>#</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>John Lilki</Table.Cell>
				<Table.Cell>September 14, 2013</Table.Cell>
				<Table.Cell> <Formats /> </Table.Cell>
				<CrudButton />
			</Table.Row>
		</Table.Body>
	</Table>
	<Pagination />
	</React.Fragment>
)

export default NNATable;
