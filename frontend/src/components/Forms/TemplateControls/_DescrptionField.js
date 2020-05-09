import React from 'react';
import PropTypes from 'prop-types';
import { Form, Popup, Icon } from 'semantic-ui-react';

/** Componente para las decripciones (pistas) */

const DescriptionField = (props) => {
	return (
		<Form.Field>
			<label>
				Información de llenado
				<Popup content="Muestra una pista como esta" trigger={<Icon circular name="question circle" />} />
			</label>
			<textarea placeholder="Información sobre como llenar el campo" name="pista" ref={props.register()} defaultValue={props.default}/>
			{/* <input type='text' placeholder="Información sobre como llenar el campo" name="pista" ref={props.register()} /> */}
		</Form.Field>
	);
};

DescriptionField.propTypes = {
	/** Para saber si se debe hacer un request para obtener info */
	item: PropTypes.object,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	default: PropTypes.string.isRequired
};

export default DescriptionField;
