import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Label } from 'semantic-ui-react';
//own
import NameField from './_shared/NameField';

const UserForm = (props) => {
	//console.log(props.isEditing ? props.data : '');

	// Forms Validation
	const { register, handleSubmit, errors } = useForm();

	//handle edit or create
	const onSubmitHandler = (data) => {
		if (props.isEditing) {
			console.log('[UserForm.js] editing user', props.id, data);
		} else {
			console.log('[UserForm.js] creating', data);
		}
		props.refresh();
		props.handleClose();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<Form.Group widths="equal">
				<NameField name="nombre" tag="Nombre" errors={errors} register={register} />
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
						//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
					>
						<option value="">--seleccione--</option>
						<option value="admin">Administrador</option>
						<option value="medico">Médico</option>
						<option value="abogado">Abagado</option>
						<option value="tsocial">Trabajador Social</option>
						<option value="psicologo">Psicólogo</option>
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
	);
};

UserForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
	/** Needed if editing */
	data: PropTypes.any
};

export default UserForm;
