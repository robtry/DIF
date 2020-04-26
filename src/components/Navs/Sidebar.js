import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//context
import UserContext from '../../context/userContext';

/**
 * Esta la barra lateral, la cual contiene las distintas opciones
 * por las cuales debe navegar el usuario por lo que es dinámico.
*/

const SidebarNav = props => {

	const isAdmin = useContext(UserContext).isAdmin;

	return (
			<Sidebar
				as={Menu}
				animation='overlay'
				icon='labeled'
				inverted
				onHide={() => props.hideSideBar()}
				vertical
				visible={props.sideBarStatus}
				width='thin'
			>
				<Menu.Item>
					ITESM CEM SS 2020
				</Menu.Item>
				<Menu.Item as={NavLink} to="/" exact>
					<Icon name='home' />
					Inicio
				</Menu.Item>
				{isAdmin && <Menu.Item as={NavLink} to="/usuarios" exact>
					<Icon name='address card' />
					Usuarios
				</Menu.Item>}
				<Menu.Item as={NavLink} to="/nnas" exact>
					<Icon name='users' />
					NNA's
				</Menu.Item>
				{isAdmin && <Menu.Item as={NavLink} to="/plantillas">
					<Icon name='file' />
					Plantillas
				</Menu.Item>}
				<Menu.Item as={NavLink} to="/formatos">
					<Icon name='file alternate' />
					Formatos
				</Menu.Item>
			</Sidebar>
	)
}

SidebarNav.propTypes = {
	/**
	 * Checa si debe abrirse y cerrarse, también debe pasarse a la TopNav
	 * y la app lo controla para saber si aplicar el dimmer
	*/
	sideBarStatus : PropTypes.bool.isRequired,
}

export default SidebarNav;
