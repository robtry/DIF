import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Esta la barra lateral, la cual contiene las distintas opciones
 * por las cuales debe navegar el usuario por lo que es dinámico.
*/

const SidebarNav = props => {
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
				<Menu.Item as={NavLink} to="/" exact>
					<Icon name='home' />
					Inicio
				</Menu.Item>
				<Menu.Item as={NavLink} to="/admins" exact>
					<Icon name='address card' />
					Admins
				</Menu.Item>
				<Menu.Item as={NavLink} to="/nnas" exact>
					<Icon name='users' />
					NNA's
				</Menu.Item>
				<Menu.Item as={NavLink} to="/medicos" exact>
					<Icon name='doctor' />
					Médicos
				</Menu.Item>
				<Menu.Item as={NavLink} to="/abogados" exact>
					<Icon name='law' />
					Abogados
				</Menu.Item>
				<Menu.Item as={NavLink} to="/tssocial" exact>
					<Icon name='user' />
					T Social
				</Menu.Item>
				<Menu.Item as={NavLink} to="/psicologos" exact>
					<Icon name='user outline' />
					Psicólogos
				</Menu.Item>
				<Menu.Item as={NavLink} to="/plantillas">
					<Icon name='file' />
					Plantillas
				</Menu.Item>
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
