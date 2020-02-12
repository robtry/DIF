import React from 'react';
import { Input, Menu, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TopNav = props => {

		return (
			<Menu secondary stackable>
				<Menu.Item header> DIF | by rob </Menu.Item>
				<Menu.Item >
					<Button icon onClick={() => props.toggleSideBar()}>
						<Icon name={props.sideBarStatus ? 'close' : 'bars'} />
					</Button>
				</Menu.Item>
				<Menu.Item>
					<Icon name='user circle' size='large'/>
					Usuario | Tipo
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Input icon='search' placeholder='Buscar...' />
					</Menu.Item>
					<Menu.Item>
						<Button primary>Salir</Button>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
}

TopNav.propTypes = {
	toggleSideBar: PropTypes.func.isRequired,
	sideBarStatus: PropTypes.bool.isRequired,
}

export default TopNav;
