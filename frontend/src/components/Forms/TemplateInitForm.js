import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Label, Message } from 'semantic-ui-react';
//own
import NameField from './_shared/NameField';
import axios from '../../util/axios';

const TemplateInitForm = (props) => {
	// Forms Validation
	const { register, handleSubmit, errors } = useForm();
	const [ isPosting, setIsPosting ] = useState(false);
	const [ isError, setIsError ] = useState(false);

	const onSubmitHandler = (data) => {
		console.log('TemplateForm', data);
		setIsPosting(true);
		axios
			.post(props.item ? '/templates/' + props.item._id : '/templates/', data)
			.then(() => {
				//console.log('UserForm', res);
				setIsPosting(false);
				props.handleClose();
				props.refresh();
			})
			.catch((err) => {
				console.log('TemplateForm error:', err.response);
				setIsError(true);
				setIsPosting(false);
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
							tag="Nombre de Plantilla"
							errors={errors}
							register={register}
							defaultValue={props.item ? props.item.nombre : ''}
						/>
						<Form.Field required>
							<label> Tipo </label>
							{errors.tipo &&
							errors.tipo.type === 'required' && (
								<Label basic color="red" pointing="below">
									Se debe selccionar un tipo de plantilla
								</Label>
							)}
							<select
								name="tipo"
								ref={register({ required: true })}
								defaultValue={props.item ? props.item.tipo : ''}
							>
								<option value="">--seleccione--</option>
								<option value="medico">Médico</option>
								<option value="juridico">Jurídico</option>
								<option value="tsocial">Trabajo Social</option>
								<option value="psicologo">Psicólogico</option>
								<option value="pedagogico">Pedagógico</option>
							</select>
						</Form.Field>
					</Form.Group>
					<Form.Field required>
						<label>
							Descripción
							{errors.descripcion && (
								<Label basic color="red" pointing="below">
									Se debe proporcionar una breve descripción
								</Label>
							)}
						</label>
						<textarea
							name="descripcion"
							placeholder="Se llena cuando..."
							ref={register({ required: true, maxLength: 200 })}
							defaultValue={props.item ? props.item.descripcion : ''}
						/>
					</Form.Field>

					<Button
						positive
						icon="checkmark"
						labelPosition="right"
						content={props.item ? 'Actualizar' : 'Agregar'}
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

TemplateInitForm.propTypes = {
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
	/** Needed if editing */
	item: PropTypes.object
};

export default TemplateInitForm;
