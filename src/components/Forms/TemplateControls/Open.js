import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
//own
import FieldName from './_FieldName';

const Open = (props) => {
	return (
		<React.Fragment>
			<FieldName register={props.register} errors={props.errors} />
			<Form.Field required>
				<label>Tipo Campo</label>
				{props.errors.fieldType &&
				props.errors.fieldType.type === 'required' && (
					<Label basic color="red" pointing="below">
						Debe seleccionar el tipo del campo
					</Label>
				)}
				<select
					name="fieldType"
					ref={props.register({ required: true })}
					//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
				>
					<option value="">--seleccione--</option>
					<option value="int">Numérico Entero</option>
					<option value="float">Numérico con Decimales</option>
					<option value="char">Texto Corto (255)</option>
					<option value="varchar">Texto muy Largo</option>
				</select>
			</Form.Field>
		</React.Fragment>
	);
};

Open.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** Refresher */
	refresh: PropTypes.func //.isRequired
};

export default Open;
