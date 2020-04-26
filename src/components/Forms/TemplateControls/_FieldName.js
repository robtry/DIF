import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const FieldName = (props) => {

	return (
		<Form.Field required>
			<label>Nombre del Campo</label>
			{props.errors.fieldName &&
			props.errors.fieldName.type === 'required' && (
				<Label basic color="red" pointing="below">
					Ingrese el nombre del campo
				</Label>
			)}
			{props.errors.fieldName &&
			props.errors.fieldName.type === 'pattern' && (
				<Label basic color="red" pointing="below">
					El nombre no puede iniciar con carácteres especiales
				</Label>
			)}
			<input
				type="text"
				name="fieldName"
				ref={props.register({ required: true, pattern: /^[0-9A-Za-zÁÉÍÓÚÑñáéíóú].*/ })}
			/>
		</Form.Field>
	);
};

FieldName.propTypes = {
	isEditing: PropTypes.bool,
};

export default FieldName;
