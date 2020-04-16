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
					<Card.Header>Informe Psicológico</Card.Header>
					<Card.Meta>Sin llenar</Card.Meta>
					<Card.Description>Formato que se llena cuendo llega el NNA</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<ButtonsCard type="format" id={1} />
				</Card.Content>
			</Card>
		</Card.Group>
	);
};

FormatCard.propTypes = {
	/** Id to get something */
	id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
};

export default FormatCard;
