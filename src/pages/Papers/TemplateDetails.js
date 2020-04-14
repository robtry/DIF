import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import RudButton from '../../components/Tables/_shared/RUD_Button';
import TemplateControlsForm from '../../components/Forms/TemplateControlsForm';

/** Este es el preview de la plantilla en modo tabla */

const TemplateDetails = (props) => {
	return (
		<Table celled structured>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell rowSpan="2">Campo</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Tipo</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Info Llenado</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Tipo/Opciones</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Controles</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell>Índice</Table.HeaderCell>
					<Table.HeaderCell>####</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				<Table.Row textAlign='center'>
					<Table.Cell>Observaciones</Table.Cell>
					<Table.Cell>Abierta</Table.Cell>
					<Table.Cell>Resaltar la información sobre...</Table.Cell>
					<Table.Cell>Texto Largo</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};

TemplateDetails.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default TemplateDetails;
