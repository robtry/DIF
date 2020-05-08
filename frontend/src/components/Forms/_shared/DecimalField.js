import React from 'react';
import { Form, Message, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DecimalField = (props) => {
	//console.log(props.errors.nombre)
	return (
		<Form.Field>
			<label> {props.tag} </label>
			{props.errors[props.name] &&
			props.errors[props.name].type === 'required' && (
				<Label basic color="red" pointing="below">
					Es necesario proporcionar el {props.tag}
				</Label>
			)}
			{errors.peso &&
			errors.peso.type === 'pattern' && (
				<Label basic color="red" pointing="below">
					Sólo se permiten números con dos decimales ej: 39.5
				</Label>
			)}
			<input
				name="peso"
				type="text"
				ref={props.register({ pattern: /^\d{1,6}(\.\d{1,2})?$/ })}
				placeholder="Kg"
				defaultValue={props.defaultValue}
			/>
		</Form.Field>
	);
};

DecimalField.propTypes = {
	/** El nombre del campo */
	name: PropTypes.string.isRequired,
	/** Tag que se muestra */
	tag: PropTypes.string.isRequired,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired,
	/** default value */
	defaultValue: PropTypes.string.isRequired
};

export default DecimalField;
