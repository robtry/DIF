import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const File = (props) => {
	return (
		<Form.Field required>
			<label>Tipo de archivo</label>
			{props.errors.tipo_archivo &&
			props.errors.tipo_archivo.type === 'required' && (
				<Label basic color="red" pointing="below">
					Debe seleccionar el tipo de archivo
				</Label>
			)}
			<select
				name="tipo_archivo"
				ref={props.register({ required: true })}
				defaultValue={ props.default }
			>
				<option value="">--seleccione--</option>
				<option value="imagen">Imagen (jpg, jpeg, png)</option>
				<option value="pdf">PDF</option>
				<option value="docx">Word ( doc, docx, odf ) </option>
				<option value="xlsx">Excel (xls, xslx, ods)</option>
				<option value="zip">ZIP, RAR</option>
			</select>
		</Form.Field>
	);
};

File.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	item: PropTypes.object,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired,
	default: PropTypes.string.isRequired
};

export default File;
