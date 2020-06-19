import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Label, Message, Dimmer, Loader } from 'semantic-ui-react';
//own
import NameField from './_shared/NameField';
import axios from '../../util/axios';
// context
import userContext from '../../context/userContext';

const NNAForm = (props) => {
	// Forms Validation
	const { register, handleSubmit, errors } = useForm();

	const [ isPosting, setIsPosting ] = useState(false);
	const [ isError, setIsError ] = useState(false);

	const [ isLoading, setLoading ] = useState(true);
	const [ admins, setAdmins ] = useState([]);

	const { isAdmin } = useContext(userContext);

	useEffect(
		() => {
			if (!isAdmin) {
				axios
					.get('/users/admins')
					.then((ans) => {
						//console.log(ans);
						setAdmins(ans.data);
						setLoading(false);
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				setLoading(false);
			}
		},
		[ isAdmin ]
	);

	const onSubmitHandler = (data) => {
		console.log('NNAForm', data);
		//return;
		let fd = new FormData();

		if (!isAdmin) {
			fd.append('username', data.username);
			fd.append('password', data.password);
		}

		fd.append('nombre', data.nombre);
		fd.append('app', data.app);
		fd.append('apm', data.apm);
		fd.append('expediente', data.expediente);
		fd.append('sexo', data.sexo);
		fd.append('fecha_nacimiento', data.fecha_nacimiento);
		if (data.image[0] && data.image[0].name) {
			fd.append('image', data.image[0], data.image[0].name.replace(/\s/g, ''));
		}

		setIsPosting(true);
		axios
			.post(props.item ? '/nnas/' + props.item._id + (!isAdmin ? '/withauth' : '') : '/nnas/', fd)
			.then(() => {
				//console.log('UserForm', res);
				setIsPosting(false);
				props.handleClose();
				props.refresh();
			})
			.catch((err) => {
				console.log('NNAForm error:', err.response);
				if (err.response && err.response.data.message === 'Error with auth') {
					setIsError('Error en la autenticación del administrador');
				} else {
					setIsError('Intente volviendo a cargar el sitio o contacte al administrador');
				}
				setIsPosting(false);
			});
	};

	return (
		<React.Fragment>
			<React.Fragment>
				{isLoading ? (
					<Dimmer active>
						<Loader />
					</Dimmer>
				) : (
					<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off" loading={isPosting}>
						{isError && <Message color="black" header="Algo anda mal..." content={isError} />}
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

						<Form.Group widths="equal">
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
							{!isAdmin && (
								<React.Fragment>
									<Form.Field>
										<label> Admin </label>
										{errors.username &&
										errors.username.type === 'required' && (
											<Label basic color="red" pointing="below">
												Un administrador debe autorizar esta operación
											</Label>
										)}
										<select name="username" ref={register({ required: true })}>
											<option value="">--seleccione--</option>
											{admins.map((a) => (
												<option key={a._id} value={a.username}>
													{a.nombre}
												</option>
											))}
										</select>
									</Form.Field>
									<Form.Field required>
										{errors.password && (
											<Message negative>
												<Message.Header>Campo requerido</Message.Header>
												<p> {errors.password.message} </p>
											</Message>
										)}
										<label>Contraseña</label>
										<input
											placeholder="password"
											ref={register({
												required: 'Por favor ingrese su contraseña',
												maxLength: { value: 30, message: 'La contraseña es muy larga' },
												minLength: {
													value: 6,
													message: 'La contraseña debe tener al menos 6 carácteres'
												}
											})}
											name="password"
											type="password"
											autoComplete="on"
										/>
									</Form.Field>
								</React.Fragment>
							)}
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
