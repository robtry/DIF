import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Separator = (props) => {
	return (
		<Form.Field required>
			<label>Título de la sección</label>
			{props.errors.fieldSeparator &&
			props.errors.fieldSeparator.type === 'required' && (
				<Label basic color="red" pointing="below">
					Debe seleccionar el campo del cual recuperar
				</Label>
			)}
			<input
				type="text"
				name="fieldSeparator"
				ref={props.register({ required: true })}
				//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
			/>
		</Form.Field>
	);
};

Separator.propTypes = {
	/** Refresher */
	refresh: PropTypes.func //.isRequired
};

export default Separator;
