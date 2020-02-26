import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Users/UserTable';
import Copyright from '../../components/Copyright/index';
//hoc
//context
//css

const User = (props) => {

	const convertToHeader = (abbreviateName) => {
		switch (abbreviateName){
			case 'admin':
				return "Administradores"
			case 'medico':
				return "Médicos"
			case 'abogado':
				return "Abagados"
			case 'tsocial':
				return "Trabajadores Sociales"
			case 'psicologo':
				return "Psicólogos"
			default:
				return "Error, checar los argumentos"
		}
	}

	return (
		<React.Fragment>
			<Header size="huge"> {convertToHeader(props.type)} </Header>
			<Copyright />
			<Table />
		</React.Fragment>
	);
}

User.propTypes = {
	/** Tipo de usuario para saber que renderear */
	type: PropTypes.oneOf(['admin', 'medico', 'abogado', 'tsocial', 'psicologo']).isRequired,
}

export default User;