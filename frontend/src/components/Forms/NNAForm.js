import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Label, Message } from 'semantic-ui-react';
//own
import NameField from './_shared/NameField';
import axios from '../../util/axios';

const NNAForm = (props) => {
	// Forms Validation
	const { register, handleSubmit, errors } = useForm();

	const [ isPosting, setIsPosting ] = useState(false);
	const [ isError, setIsError ] = useState(false);

	const onSubmitHandler = (data) => {
		console.log('NNAForm', data);
		//return;
		let fd = new FormData();

		fd.append('nombre', data.nombre);
		fd.append('app', data.app);
		fd.append('apm', data.apm);
		fd.append('expediente', data.expediente);
		fd.append('sexo', data.sexo);
		fd.append('fecha_nacimiento', data.fecha_nacimiento);
		fd.append('image', data.image[0], data.image[0].name.replace(/\s/g, ''));

		setIsPosting(true);
		axios
			.post(props.item ? '/nnas/' + props.item._id : '/nnas/', fd)
			.then(() => {
				//console.log('UserForm', res);
				setIsPosting(false);
				props.handleClose();
				props.refresh();
			})
			.catch((err) => {
				console.log('NNAForm error:', err.response);
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
							tag="Nombre"
							errors={errors}
							register={register}
							defaultValue={props.item ? props.item.nombre : ''}
						/>
						<NameField
							name="app"
							tag="Apellido Paterno"
							errors={errors}
							register={register}
							defaultValue={props.item ? props.item.app : ''}
						/>
						<NameField
							name="apm"
							tag="Apellido Materno"
							errors={errors}
							register={register}
							defaultValue={props.item ? props.item.apm : ''}
						/>
					</Form.Group>

					<Form.Group widths="equal">
						<Form.Field required>
							<label> Expediente </label>
							{errors.expediente && (
								<Label basic color="red" pointing="below">
									{errors.expediente.message}
								</Label>
							)}
							<input
								type="text"
								name="expediente"
								ref={register({
									required: 'Para agregar un NNA se requiere un expediente',
									maxLength: { value: 100, message: 'El expediente es muy largo' }
								})}
								defaultValue={props.item ? props.item.expediente : ''}
							/>
						</Form.Field>

						<Form.Field required>
							<label> Fecha de nacimiento </label>
							{errors.fecha_nacimiento && (
								<Label basic color="red" pointing="below">
									Seleccione una fecha de naciemiento
								</Label>
							)}
							<input
								type="date"
								ref={register({ required: true })}
								name="fecha_nacimiento"
								defaultValue={
									props.item ? (
										new Date(props.item.fecha_nacimiento).toISOString().substr(0, 10)
									) : null
								}
							/>
						</Form.Field>
						<Form.Field required>
							<label> Sexo </label>
							{errors.sexo &&
							errors.sexo.type === 'required' && (
								<Label basic color="red" pointing="below">
									Se debe selccionar un sexo
								</Label>
							)}
							<select
								name="sexo"
								ref={register({ required: true })}
								defaultValue={props.item ? props.item.sexo : ''}
							>
								<option value="">--seleccione--</option>
								<option value="m">Femenino</option>
								<option value="h">Masculino</option>
							</select>
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field>
							<label>Foto</label>
							<input
								name="image"
								type="file"
								accept=".jpg,.png,.jpeg"
								ref={register()}
								multiple={false}
							/>
						</Form.Field>
					</Form.Group>

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

NNAForm.propTypes = {
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired,
	/** Needed if editing */
	item: PropTypes.object
};

export default NNAForm;
