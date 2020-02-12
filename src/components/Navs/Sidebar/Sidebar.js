import React from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
					Home
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='gamepad' />
					Games
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='camera' />
					Channels
				</Menu.Item>
			</Sidebar>
	)
}

SidebarNav.propTypes = {
	sideBarStatus : PropTypes.bool.isRequired,
}

export default SidebarNav;
