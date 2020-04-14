import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import FieldName from './_FieldName';

const Consistent = (props) => {
	return (
		<React.Fragment>
			<FieldName register={props.register} errors={props.errors} />
		<Form.Field required>
			<label>Campo de donde se obtiene la info</label>
			{props.errors.fieldConsistent &&
			props.errors.fieldConsistent.type === 'required' && (
				<Label basic color="red" pointing="below">
					Debe seleccionar el campo del cual recuperar
				</Label>
			)}
			<select
				name="fieldConsistent"
				ref={props.register({ required: true })}
				//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
			>
				<option value="">--seleccione--</option>
				<option value="char">Expediente</option>
				<option value="int">Nombre</option>
				<option value="int">Apellido Paterno</option>
				<option value="int">Apellido Materno</option>
				<option value="float">Fecha de nacimiento</option>
				<option value="varchar">Sexo</option>
			</select>
		</Form.Field>
		</React.Fragment>
	);
};

Consistent.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** Refresher */
	refresh: PropTypes.func //.isRequired
};

export default Consistent;
