import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import Formats from './AccordionFormats/AccordionFormats';
import RudButton from '../_shared/RUD_Button';
import NNAForm from '../../Forms/NNAForm';

/**
 * Es la tabla que se muestra los NNAs
*/

const NNATable = props => {
	return (
		<Table celled padded>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Expediente</Table.HeaderCell>
					<Table.HeaderCell>Nombre</Table.HeaderCell>
					<Table.HeaderCell>Ir a detalles</Table.HeaderCell>
					<Table.HeaderCell>#</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>John Lilki</Table.Cell>
					<Table.Cell>September 14, 2013</Table.Cell>
					<Table.Cell>ir deta</Table.Cell>
					<RudButton
						id={1}
						onDelete="John Lilki"
						onEdit={NNAForm}
						onShow={Formats}
						refresh={props.loadData}
						title='Formatos'
					/>
				</Table.Row>
			</Table.Body>
		</Table>
	)
}

NNATable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default NNATable;
