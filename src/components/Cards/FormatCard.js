import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import defaultUser from '../../assets/default.png';
//context
import ButtonsCard from './ButtonsCard';

const FormatCard = (props) => {
	return (
		<Card.Group>
			<Card>
				<Card.Content>
					<Card.Header>Informe Psicológico</Card.Header>
					<Card.Meta>4 - ago -2012</Card.Meta>
					<Card.Description>
						<Label as="a" image>
							<img src={defaultUser} alt='usr-pic-profile'/>
							Stevie
						</Label>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<ButtonsCard type="format" id={props.id} />
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
