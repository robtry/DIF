import React from 'react';
import { Form, Message, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NameField = (props) => {
	//console.log(props.errors.nombre)
	return (
		<Form.Field required>
			<label> {props.tag} </label>
			{props.errors[props.name] &&
			props.errors[props.name].type === 'required' && (
				<Label basic color="red" pointing="below">
					Es necesario proporcionar el {props.tag}
				</Label>
			)}
			<input
				type="text"
				name={props.name}
				ref={props.register({
					required: true,
					pattern: /^[A-ZÁÉÍÓÚÑñáéíóú]+(([ ][a-zA-ZÁÉÍÓÚÑñáéíóú])?[a-zA-ZÁÉÍÓÚÑñáéíóú]*)*$/,
					minLength: 3,
					maxLength: 100
				})}
				//defaultValue={(props.isEditing && mesa) && mesa.letra ? mesa.letra : null}
			/>
			{props.errors[props.name] &&
			props.errors[props.name].type === 'minLength' && (
				<Label basic color="red" pointing="above">
					El {props.tag} es muy corto
				</Label>
			)}

			{props.errors[props.name] &&
			props.errors[props.name].type === 'maxLength' && (
				<Label basic color="red" pointing="above">
					El {props.tag} es demasido largo
				</Label>
			)}

			{props.errors[props.name] &&
			props.errors[props.name].type === 'pattern' && (
				<Message negative>
					<Message.Header>Ingrese un {props.tag} válido</Message.Header>
					<p> Revise que no le pase lo siguiente </p>
					<ul>
						<li> Debe iniciar con mayúscula </li>
						<li> Únicamente se permiten letras </li>
						<li> Asegurese de que no termina o incia espacio </li>
					</ul>
				</Message>
			)}
		</Form.Field>
	);
};

NameField.propTypes = {
	/** El nombre del campo */
	name: PropTypes.string.isRequired,
	/** Tag que se muestra */
	tag: PropTypes.string.isRequired,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired
};

export default NameField;
