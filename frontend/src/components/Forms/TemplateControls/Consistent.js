import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own

const Consistent = (props) => {
	return (
		<Form.Field required>
			<label>Campo de donde se obtiene la info</label>
			{props.errors.fuente &&
			props.errors.fuente.type === 'required' && (
				<Label basic color="red" pointing="below">
					Debe seleccionar el campo del cual recuperar
				</Label>
			)}
			<select
				name="fuente"
				ref={props.register({ required: true })}
				defaultValue={ props.default }
			>
				<option value="">--seleccione--</option>
				<option value="expediente">Expediente</option>
				<option value="nombre">Nombre</option>
				<option value="app">Apellido Paterno</option>
				<option value="apm">Apellido Materno</option>
				<option value="fecha_nacimiento">Fecha de nacimiento</option>
				<option value="sexo">Sexo</option>
			</select>
		</Form.Field>
	);
};

Consistent.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	item: PropTypes.object,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired,
	default: PropTypes.string.isRequired
};

export default Consistent;
