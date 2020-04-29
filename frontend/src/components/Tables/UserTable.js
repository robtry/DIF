import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// own
import CrudButton from './_shared/RUD_Button';
import UserForm from '../Forms/UserForm';

import defaultUserImage from '../../assets/default.png';
/**
 * Es la tabla que se usa para el index de todos los usuarios
 */

const UserTable = (props) => {
	const convertToIcon = (abbreviateName) => {
		switch (abbreviateName) {
			case 'admin':
				return 'address card';
			case 'medico':
				return 'doctor';
			case 'juridico':
				return 'law';
			case 'tsocial':
				return 'user';
			case 'psicologo':
				return 'user outline';
			case 'pedagogo':
				return 'university';
			default:
				console.log('[UserTable.js]: No icon for this user');
		}
	};

	const readable = (abbreviateName, sex) => {
		switch (abbreviateName) {
			case 'admin':
				return 'Administrador' + (sex === 'm' ? 'a' : '');
			case 'medico':
				return 'Médic' + (sex === 'm' ? 'a' : 'o');
			case 'juridico':
				return 'Jurídic' + (sex === 'm' ? 'a' : 'o');
			case 'tsocial':
				return 'Trabajador' + (sex === 'm' ? 'a' : '') + ' Social';
			case 'psicologo':
				return 'Psicológ' + (sex === 'm' ? 'a' : 'o');
			case 'pedagogo':
				return 'Pedagog' + (sex === 'm' ? 'a' : 'o');
			default:
				console.log('[UserTable.js]: No icon for this user');
		}
	};

	return (
		<Card.Group centered stackable /*itemsPerRow={4}*/>
			{props.data.map((item) => (
				<Card key={item._id}>
					<Card.Content>
						<Image floated="left" size="mini" src={item.image ? item.image : defaultUserImage} />
						<Card.Header>{item.nombre}</Card.Header>
						<Card.Meta>
							<Icon name={convertToIcon(item.tipo)} />
							&nbsp; {readable(item.tipo, item.sexo)}
						</Card.Meta>
						<br />
						<Button
							icon
							basic
							color="black"
							fluid
							labelPosition="left"
							as={NavLink}
							to={'/historial/' + item._id}
						>
							Ir al historial
							<Icon name="history" />
						</Button>
					</Card.Content>
					<Card.Content extra>
						<CrudButton
							deletePath={'users/' + item._id}
							onDelete={item.nombre}
							onEdit={UserForm}
							refresh={props.loadData}
							item={item}
						/>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	);
};

UserTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default UserTable;
