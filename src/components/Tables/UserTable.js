import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// own
import CrudButton from './_shared/RUD_Button';
import UserForm from '../Forms/UserForm';

import defaultUser from '../../assets/default.png';
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
			case 'abogado':
				return 'law';
			case 'tsocial':
				return 'user';
			case 'psicologo':
				return 'user outline';
			default:
				console.log('[UserTable.js]: No icon for this user');
		}
	};

	return (
		<Card.Group centered>
			<Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card>
			<Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card><Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card><Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card><Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card><Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card><Card>
				<Card.Content>
					<Image floated="left" size="mini" src={defaultUser} />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>
						<Icon name={convertToIcon('admin')} />
						Admin
					</Card.Meta>
					<NavLink to="/historial/1" exact>
					<Icon name='right arrow'/>
						Ir al historial 
					</NavLink>
				</Card.Content>
				<Card.Content extra>
					<CrudButton id="1" onDelete="John Lilki" onEdit={UserForm} refresh={props.loadData} />
				</Card.Content>
			</Card>
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
