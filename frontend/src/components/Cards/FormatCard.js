import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dateTime from 'date-time';
//own
import defaultUser from '../../assets/default.png';
//context
import ButtonsCard from './ButtonsCard';

const FormatCard = (props) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>{props.item.plantilla.nombre}</Card.Header>
				<Card.Meta>Creado: {dateTime(new Date(props.item.fecha_creacion)).split(' ')[0]}</Card.Meta>
				<Card.Meta>Actualizado: {dateTime(new Date(props.item.ultima_actualizacion))}</Card.Meta>
				<Card.Description>
					<Label as="a" image>
						<img src={defaultUser} alt="usr-pic-profile" />
						Stevie
					</Label>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<ButtonsCard type="format" id={props.item._id} item={props.item} />
			</Card.Content>
		</Card>
	);
};

FormatCard.propTypes = {
	/** Id to get something */
	item: PropTypes.object.isRequired
};

export default FormatCard;
