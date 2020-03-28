import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//context
import ButtonsCard from './ButtonsCard';

const FormatCard = (props) => {
	return (
		<Card.Group>
			<Card>
				<Card.Content>
					<Card.Header>Formato de Llegada</Card.Header>
					<Card.Meta>Sin llenar</Card.Meta>
					<Card.Description>Formato que se llena cuendo llega el NNA</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<ButtonsCard

					/>
				</Card.Content>
			</Card>
		</Card.Group>
	);
};

FormatCard.propTypes = {
	/** Tipo de formato para ver si el usuario puede */
	type: PropTypes.oneOf([ 'template', 'format' ]).isRequired
}

export default FormatCard;
