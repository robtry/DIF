import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import defaultUser from '../../assets/default.png';
//context
import ButtonsCard from './ButtonsCard';

const FormatCard = (props) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>{props.item._id.plantilla.nombre}</Card.Header>
				<Card.Meta>Creado: {new Date(props.item._id.fecha_creacion).toLocaleDateString('es')}</Card.Meta>
				<Card.Meta>Actualizado: {new Date(props.item._id.ultima_actualizacion).toLocaleString('es')}</Card.Meta>
				<Card.Description>
					{props.item.participaciones.map((usr) => (
						<Label as="a" image key={usr._id}>
							<img src={defaultUser} alt="usr-pic-profile" />
							{usr.nombre}
						</Label>
					))}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<ButtonsCard type="format" id={props.item._id._id} item={props.item} nna={props.nna}/>
			</Card.Content>
		</Card>
	);
};

FormatCard.propTypes = {
	/** Id to get something */
	item: PropTypes.object.isRequired
};

export default FormatCard;
