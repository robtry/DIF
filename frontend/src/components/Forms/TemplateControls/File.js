import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const File = (props) => {
	return (
		<Form.Field required>
			<label>Tipo de archivo</label>
			{props.errors.fieldFile &&
			props.errors.fieldFile.type === 'required' && (
				<Label basic color="red" pointing="below">
					Debe seleccionar el tipo de archivo
				</Label>
			)}
			<select
			name='fieldFile'
			ref={props.register({ required: true })}
			//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
			>
				<option value="">--seleccione--</option>
				<option value="int">Imagen (jpg, jpeg, png)</option>
				<option value="float">PDF</option>
				<option value="float">DOCX</option>
				<option value="char">ZIP</option>
			</select>
		</Form.Field>
	);
};

File.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** Refresher */
	refresh: PropTypes.func //.isRequired
};

export default File;
