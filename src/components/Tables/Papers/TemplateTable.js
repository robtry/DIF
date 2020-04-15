import React from 'react';
import { Table }  from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import ButtonsCard from '../../Cards/ButtonsCard';
import TemplateInitForm from '../../Forms/TemplateInitForm';
import RudButton from '../_shared/RUD_Button';

/**
 * Es la tabla que se usa para el index de todos las plantillas
*/

const TemplateTable = props => (
	<React.Fragment>
	<Table striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Título</Table.HeaderCell>
				<Table.HeaderCell>Categoría</Table.HeaderCell>
				<Table.HeaderCell>Formatos Llenados</Table.HeaderCell>
				<Table.HeaderCell>#</Table.HeaderCell>
				<Table.HeaderCell>#</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>Derechos del NNA</Table.Cell>
				<Table.Cell>Legal</Table.Cell>
				<Table.Cell>14</Table.Cell>
				<Table.Cell>
					<ButtonsCard
						id={1}
						type='template'
						title='Derechos del NNA'
					/>
				</Table.Cell>
				<RudButton
						id={1}
						onDelete='Derechos del NNA'
						onEdit={TemplateInitForm}
						refresh={props.loadData}
					/>
			</Table.Row>
		</Table.Body>
	</Table>
	</React.Fragment>
)

TemplateTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default TemplateTable;