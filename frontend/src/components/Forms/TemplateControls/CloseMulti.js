import React from 'react';
import { Form, Popup, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own

const CloseMulti = (props) => {
	return (
		<Form.Field>
			<label>
				Opciones
				<Popup
					content="Opciones que se desplagaran SEPARADOS POR SALTO DE LÍNEA"
					trigger={<Icon circular name="question circle" />}
				/>
			</label>
			{props.errors.options &&
			props.errors.options.type === 'required' && (
				<Label basic color="red" pointing="below">
					Por favor ingrese al menos una opción
				</Label>
			)}
			{props.errors.options &&
			props.errors.options.type === 'pattern' && (
				<Label basic color="red" pointing="below">
					Ingrese las opciones en el formato correcto
				</Label>
			)}
			<textarea
				placeholder="Inserte las posibles opciones separadas por el salto de línea"
				ref={props.register({ required: true, pattern: /^[a-z0-9A-ZÁÉÍÓÚÑñáéíóú].*\n?/ })}
				name="options"
			/>
		</Form.Field>
	);
};

CloseMulti.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** Refresher */
	refresh: PropTypes.func //.isRequired
};

export default CloseMulti;
