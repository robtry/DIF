import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const UserTypes = (props) => {
	return (
		<Form>
			<Form.Field width="5">
				<label> Plantillas </label>
				<select
					onChange={(e) => {
						props.setTypes(e.target.value);
					}}
					defaultValue={props.types}
				>
					<option value="all">Todas</option>
					<option value="medico">Médico</option>
					<option value="juridico">Jurídico</option>
					<option value="tsocial">Trabajo Social</option>
					<option value="psicologo">Psicológico</option>
					<option value="pedagogico">Pedagógico</option>
				</select>
			</Form.Field>
		</Form>
	);
};

UserTypes.propTypes = {
	setTypes: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
}

export default UserTypes;
