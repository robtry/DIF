import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NameField = props => {
	//console.log(props.errors.nombre)
	return (
		<Form.Field required>
			<label> {props.tag} </label>
			<input
				type='text'
				name={props.name}
				ref={props.register({
					required: true,
					pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
					minLength: 3
				})}
			//defaultValue={(props.isEditing && mesa) && mesa.letra ? mesa.letra : null}
			/>
			{props.errors[props.name] && props.errors[props.name].type === 'minLength' && (
				<Message negative>
					<Message.Header>El {props.tag} es muy corto</Message.Header>
				</Message>
			)}
			{props.errors[props.name] && props.errors[props.name].type === 'required' && (
				<Message negative>
					<Message.Header>Es necesario proporcionar el {props.tag} completo</Message.Header>
				</Message>
			)}
			{props.errors[props.name] && props.errors[props.name].type === 'pattern' && <Message negative>
				<Message.Header>Ingrese un {props.tag} válido</Message.Header>
				<p> Por favor ingrese un {props.tag} válido </p>
				<ul>
					<li> Solo se permiten letras </li>
					<li> Asegurese de que no termina o incia espacio </li>
				</ul>
			</Message>}
		</Form.Field>
	)
};

NameField.propTypes = {
	/** El nombre del campo */
	name: PropTypes.string.isRequired,
	/** Tag que se muestra */
	tag: PropTypes.string.isRequired,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired,
}

export default NameField;