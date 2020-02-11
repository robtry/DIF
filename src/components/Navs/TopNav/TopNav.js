import React, { Component } from 'react';
import { Input, Menu, Button, Icon } from 'semantic-ui-react';

const TopNav = () => {

		return (
			<Menu secondary stackable>
				<Menu.Item header> DIF | by rob </Menu.Item>
				<Menu.Item >
					<Button>Click Here</Button>
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

export default TopNav;