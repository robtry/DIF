import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import ButtonsCard from '../../Cards/ButtonsCard';
import TemplateInitForm from '../../Forms/TemplateInitForm';
import RudButton from '../_shared/RUD_Button';

/**
 * Es la tabla que se usa para el index de todos las plantillas
*/

const TemplateTable = (props) => (
	<Card.Group centered stackable>
		<Card>
			<Card.Content>
				<Card.Header>Informe Psicológico</Card.Header>
				<Card.Meta>Esta es una descripción del archivo</Card.Meta>
				<br/>
				<Label tag>Psicología</Label>
			</Card.Content>
			<Card.Content extra>
				<Label color="blue" size="mini">
					<Icon name="chart bar" />
					12 Formatos
				</Label>
				<Label color='teal' size="mini">
					<Icon name="user" />
					15 usuarios
				</Label>
			</Card.Content>
			<Card.Content extra>
				<ButtonsCard id={1} type="template" title="Informe Psicológico" />
			</Card.Content>
			<Card.Content extra>
				<RudButton id={1} onDelete="Informe Psicológico" onEdit={TemplateInitForm} refresh={props.loadData} />
			</Card.Content>
		</Card>

	</Card.Group>
);

TemplateTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default TemplateTable;
