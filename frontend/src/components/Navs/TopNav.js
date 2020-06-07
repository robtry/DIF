import React, { useContext } from 'react';
import { Breadcrumb, Menu, Button, Icon, Responsive, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
//own
import defaultUser from '../../assets/default.png';
//context
import UserContext from '../../context/userContext';
/**
 * Esta es la barra de navegación de arriba la cual esta presente en todo momento
 * muestra nombre y tipo de usuario, tiene la barra de busqueda, y el botón para desplegar
 * la barra lateral
 */

const TopNav = (props) => {
	const { logOut, currentUser } = useContext(UserContext);
	const location = useLocation();

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
				console.log('[TopNav.js]: No icon for this user');
		}
	};

	return (
		// si se quita fixed="top", poner secondary
		<Menu stackable fixed={props.sideBarStatus ? null : 'top'}>
			<Menu.Item header>
				DIF
				{/* DIF | by &nbsp;<a href="https://robtry.github.io/"> Rob </a> */}
			</Menu.Item>
			<Menu.Item>
				<Button icon onClick={() => props.toggleSideBar()}>
					<Icon name={props.sideBarStatus ? 'close' : 'bars'} />
				</Button>
			</Menu.Item>
			<Menu.Item as={NavLink} to={`/perfil/${currentUser._id}`} exact>
				<Image src={defaultUser} avatar />
				{`${currentUser.nombre} | ${readable(currentUser.tipo, currentUser.sexo)}`}
			</Menu.Item>
			<Menu.Menu position="right">
				<Responsive minWidth={345}>
					<Menu.Item>
						<Breadcrumb>
							<Breadcrumb.Section>
								<Icon name="home" />
							</Breadcrumb.Section>
							<Breadcrumb.Divider icon="right chevron" />
							<Breadcrumb.Section>
								<div style={{ textTransform: 'capitalize' }}>{location.pathname.replace('/', '')}</div>
							</Breadcrumb.Section>
						</Breadcrumb>
					</Menu.Item>
				</Responsive>
				<Menu.Item>
					<Button
						primary
						basic
						onClick={() => {
							logOut('un token');
						}}
					>
						Salir
					</Button>
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
