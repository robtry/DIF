import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
//own

const Open = (props) => {
	return (
		<React.Fragment>
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
					<option value="date">Fecha</option>
					<option value="datetime">Fecha y Hora</option>
				</select>
			</Form.Field>
			<Form.Field>
				<label>Ejemplo</label>
				<input
					type='text'
					placeholder='Mostrará un ejemplo como este'
					name='fieldExample'
					ref={props.register()}
				/>
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
