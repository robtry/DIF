import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Message,/* Dimmer, Loader */} from 'semantic-ui-react';
//own

const NNAForm = props => {
	// Forms Validation
	const { register, handleSubmit, errors } = useForm();
	const onSubmitHandler = data => {
		if(props.isEditing){
			console.log('[NNAForm.js] editing user', props.id, data);
		}else{
			console.log('[NNAForm.js] creating',data);
		}
		props.refresh();
		props.handleClose();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<Form.Group widths="equal">
				<Form.Field required>
					<label> Nombre </label>
					<input
						type="text"
						name="nombre"
						ref={register({ required: true, pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/ })}
						//defaultValue={(props.isEditing && mesa) && mesa.letra ? mesa.letra : null}
					/>
					{errors.nombre && errors.nombre.type === 'required' && (
						<Message negative>
							<Message.Header>Es necesario proporcionar el nombre completo</Message.Header>
						</Message>
					)}
					{ errors.nombre && errors.nombre.type === 'pattern' && <Message negative>
							<Message.Header>Ingrese un nombre válido</Message.Header>
							<p> Por favor ingrese un nombre válido </p>
							<ul>
								<li> Solo se permiten letras </li>
								<li> Asegurese de que no termina con espacio al final</li>
							</ul>
						</Message> }
				</Form.Field>
				<Form.Field required>
					<label> Tipo </label>
					<select
						name="tipo"
						ref={register({ required: true })}
						//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
					>
						<option value="">--seleccione--</option>
						<option value="admin">Administrador</option>
						<option value="medico">Médico</option>
						<option value="abogado">Abagado</option>
						<option value="tsocial">Trabajadore Social</option>
						<option value="psicologo">Psicólogo</option>
					</select>
					{errors.tipo && errors.tipo.type === 'required' && (
						<Message negative>
							<Message.Header>
								Se debe selccionar un tupo para el usuario
							</Message.Header>
						</Message>
					)}
				</Form.Field>
			</Form.Group>
			<Form.Group widths="equal"></Form.Group>
			<Button
				positive
				icon="checkmark"
				labelPosition="right"
				content={props.isEditing ? 'Actualizar' : 'Agregar'}
				type="submit"
				floated="right"
			/>
			<br />
			<br />
		</Form>
	);
};

NNAForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired
};

export default NNAForm;
