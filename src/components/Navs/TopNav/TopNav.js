import React, { useContext } from "react";
import { Input, Menu, Button, Icon, Responsive } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
//context
import UserContext from '../../../context/userContext';
/**
 * Esta es la barra de navegación de arriba la cual esta presente en todo momento
 * muestra nombre y tipo de usuario, tiene la barra de busqueda, y el botón para desplegar
 * la barra lateral
 */

const TopNav = props => {

	const logOut = useContext(UserContext).logOut;

	return (
		// si se quita fixed="top", poner secondary
		<Menu stackable fixed={props.sideBarStatus ? null : "top"}>
			<Menu.Item header>
				DIF
				{/* DIF | by &nbsp;<a href="https://robtry.github.io/"> Rob </a> */}
			</Menu.Item>
			<Menu.Item>
				<Button icon onClick={() => props.toggleSideBar()}>
					<Icon name={props.sideBarStatus ? "close" : "bars"} />
				</Button>
			</Menu.Item>
			<Menu.Item as={NavLink} to="/profile/1" exact>
				<Icon name="user circle" size="large" />
				Usuario | Tipo
			</Menu.Item>
			<Menu.Menu position="right">
				<Responsive minWidth={345}>
					<Menu.Item>
						<Input icon="search" placeholder="Buscar..." />
					</Menu.Item>
				</Responsive>
				<Menu.Item>
					<Button primary basic onClick={() => {logOut('un token')}}>Salir</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

TopNav.propTypes = {
	/** Método que viene app para hacer el toggle */
	toggleSideBar: PropTypes.func.isRequired,
	/** Requerido para saber que icono tomará el botón */
	sideBarStatus: PropTypes.bool.isRequired
};

export default TopNav;
