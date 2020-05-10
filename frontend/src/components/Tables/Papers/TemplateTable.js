import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import ButtonsCard from '../../Cards/ButtonsCard';
import TemplateInitForm from '../../Forms/TemplateInitForm';
import CrudButton from '../_shared/RUD_Button';

/**
 * Es la tabla que se usa para el index de todos las plantillas
*/

const TemplateTable = (props) => {
	const convertToHeader = (abbreviateName) => {
		switch (abbreviateName) {
			case 'medico':
				return 'Médico';
			case 'juridico':
				return 'Jurídico';
			case 'tsocial':
				return 'Trabajo Social';
			case 'psicologo':
				return 'Psicólogico';
			case 'pedagogo':
				return 'Pedagógico';
			default:
				return 'Error, checar los argumentos';
		}
	};

	return (
		<Card.Group centered stackable>
			{props.data.map((item) => (
				<Card key={item._id}>
					<Card.Content>
						<Card.Header>{item.nombre}</Card.Header>
						<Card.Meta>{item.descripcion}</Card.Meta>
						<br />
						<Label tag>{convertToHeader(item.tipo)}</Label>
					</Card.Content>
					<Card.Content extra>
						<Label color="blue" size="mini">
							<Icon name="chart bar" />
							12 Formatos
						</Label>
						<Label color="teal" size="mini">
							<Icon name="user" />
							15 usuarios
						</Label>
					</Card.Content>
					<Card.Content extra>
						<ButtonsCard id={'templates/' + item._id} type="template" item={item} />
					</Card.Content>
					<Card.Content extra>
						<CrudButton
							deletePath={'templates/' + item._id}
							onDelete={item.nombre}
							onEdit={TemplateInitForm}
							refresh={props.loadData}
							item={item}
						/>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	);
};

TemplateTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default TemplateTable;
