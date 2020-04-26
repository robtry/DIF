import React from 'react';
import { Table } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// own
//import Formats from './AccordionFormats/AccordionFormats';
import RudButton from './_shared/RUD_Button';
import NNAForm from '../Forms/NNAForm';

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
					<Table.Cell>kICNOSDICNS</Table.Cell>
					<Table.Cell>John Lilki</Table.Cell>
					<Table.Cell>
						<NavLink to="/nna/1" exact>
							Ver detalles
						</NavLink>
					</Table.Cell>
					<Table.Cell textAlign='center'>
					<RudButton
						id={1}
						onDelete="John Lilki"
						onEdit={NNAForm}
						refresh={props.loadData}
					/>
					</Table.Cell>
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
