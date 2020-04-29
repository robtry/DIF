import React from 'react';
import PropTypes from 'prop-types';
import { Form, Popup, Icon, TextArea } from 'semantic-ui-react';

/** Componente para las decripciones (pistas) */

const DescriptionField = () => {
	return <Form.Field>
	<label>
		Información de llenado
		<Popup
			content="Muestra una pista como esta"
			trigger={<Icon circular name="question circle" />}
		/>
	</label>
	<TextArea placeholder="Información sobre como llenar el campo" />
</Form.Field>
}

DescriptionField.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func, //.isRequired,
	/** Refresher */
	refresh: PropTypes.func //.isRequired
};

export default DescriptionField;