import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Label, Message } from 'semantic-ui-react';
import axios from '../../util/axios';
//own
import NameField from './_shared/NameField';

const UserForm = (props) => {
	//console.log(props.item)

	// Forms Validation
	const { register, handleSubmit, errors } = useForm();

	// posting
	const [ isPosting, setIsPosting ] = useState(false);
	const [ userExists, setUserExists ] = useState(false);
	const [ isError, setIsError ] = useState(false);

	//handle edit or create
	const onSubmitHandler = (data) => {
		//console.log('UserForm', data);
		setIsPosting(true);
		setUserExists(false);
		axios
			.post(props.item ? '/users/' + props.item._id : '/users/', data)
			.then(() => {
				//console.log('UserForm', res);
				setIsPosting(false);
				props.handleClose();
				props.refresh();
			})
			.catch((err) => {
				console.log('UserForm error:', err.response);

				if (err.response && err.response.data.message === 'username already exists') {
					setUserExists(true);
					setIsPosting(false);
				} else {
					//err.response.status === 500)
					setIsError(true);
					setIsPosting(false);
				}
			});
	};

	return (
		<React.Fragment>
			{isError ? (
				<Message
					color="black"
					header="Algo anda mal..."
					content="Intente volviendo a cargar el sitio o contacte al administrador"
				/>
			) : (
				<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off" loading={isPosting}>
					<Form.Group widths="equal">
						<NameField
							name="nombre"
							tag="Nombre"
							errors={errors}
							register={register}
							defaultValue={props.item ? props.item.nombre : ''}
						/>
						<Form.Field required>
							<label> Tipo </label>
							{errors.tipo &&
							errors.tipo.type === 'required' && (
								<Label basic color="red" pointing="below">
									Se debe selccionar un tipo para el usuario
								</Label>
							)}
							<select
								name="tipo"
								ref={register({ required: true })}
								defaultValue={props.item ? props.item.tipo : ''}
								//required
							>
								<option value="">--seleccione--</option>
								<option value="admin">Administrador</option>
								<option value="medico">Médico</option>
								<option value="juridico">Jurídico</option>
								<option value="tsocial">Trabajador Social</option>
								<option value="psicologo">Psicólogo</option>
								<option value="pedagogo">Pedagógico</option>
							</select>
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field width="10">
							<label>Username</label>
							{errors.username && (
								<Label basic color="red" pointing="below">
									Se debe proporcionar un nick para que el usuario pueda ingresar.
								</Label>
							)}
							<input
								name="username"
								type="text"
								ref={register({ required: true, pattern:  /^\S*$/, maxLength: 30, minLength: 6 })}
								placeholder="Para que el usuario ingrese"
								defaultValue={props.item ? props.item.username : ''}
							/>
							{errors.username &&
							errors.username.type === 'minLength' && (
								<Label basic color="red" pointing="above">
									El username debe tener al menos de 6 carácteres
								</Label>
							)}
							{errors.username &&
							errors.username.type === 'maxLength' && (
								<Label basic color="red" pointing="above">
									El username es demasiado largo
								</Label>
							)}
							{userExists && (
								<Message negative>
									<Message.Header>El usuarname ingresado ya existe</Message.Header>
									<p>Por favor ingrese un username distinto</p>
								</Message>
							)}
						</Form.Field>
						<Form.Field required>
							<label>Sexo</label>
							{errors.sexo && (
								<Label basic color="red" pointing="below">
									Se debe proporcionar un sexo para el usuario
								</Label>
							)}
							<select
								name="sexo"
								ref={register({ required: true })}
								defaultValue={props.item ? props.item.sexo : ''}
								//required
							>
								<option value="">--seleccione--</option>
								<option value="m">Mujer</option>
								<option value="h">Hombre</option>
							</select>
						</Form.Field>
					</Form.Group>
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
			)}
		</React.Fragment>
	);
};

UserForm.propTypes = {
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
	/** Needed if editing */
	item: PropTypes.object
};

export default UserForm;
