import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
//own

const Open = (props) => {
	return (
		<React.Fragment>
			<Form.Field required>
				<label>Tipo Campo</label>
				{props.errors.tipo_campo &&
				props.errors.tipo_campo.type === 'required' && (
					<Label basic color="red" pointing="below">
						Debe seleccionar el tipo del campo
					</Label>
				)}
				<select
					name="tipo_campo"
					ref={props.register({ required: true })}
					defaultValue={ props.defaultCampo }
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
					type="text"
					placeholder="Mostrará un ejemplo como este"
					name="placeholder"
					ref={props.register()}
					defaultValue={props.defaultPlaceHolder}
				/>
			</Form.Field>
		</React.Fragment>
	);
};

Open.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	item: PropTypes.object,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired,
	/** default */
	defaultCampo: PropTypes.string.isRequired,
	defaultPlaceHolder: PropTypes.string.isRequired
};

export default Open;
