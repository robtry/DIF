import React from 'react'
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
				<Menu.Item as='a'>
					<Icon name='home' />
					Inicio
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='address card' />
					Admins
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='users' />
					NNA's
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='doctor' />
					Médicos
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='law' />
					Abogados
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='user' />
					T Social
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='user outline' />
					Psicólogos
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='file' />
					Plantillas
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='file alternate' />
					Formatos
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='th' />
					Auxiliares
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
