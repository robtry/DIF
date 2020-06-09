import React, { useContext, useState } from 'react';
import { Container, Header, Grid, Form, Button, Message, Icon, /*Label*/ } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
//own
import Copyright from '../../components/Copyright';
import axios from '../../util/axios';
import Loader from '../../components/Loader/MainLoader';
//context
import userContext from '../../context/userContext';
//css

const UserProfile = () => {
	const { register, handleSubmit, errors, watch } = useForm();
	const { currentUser } = useContext(userContext);
	const [ isUpdating, setIsUpdating ] = useState(false);
	const [ isError, setIsError ] = useState(false);
	const [ updatedCorrectly, setUpdatedCorrectly ] = useState(null);

	const onSubmitHandler = (data) => {
		//console.log(data);
		setIsError(false);
		setIsUpdating(true);
		axios
			.post(`/users/password/${currentUser._id}`, {
				current_password: data.current_password,
				new_password: data.new_password
			})
			.then(() => {
				setUpdatedCorrectly(true);
				setIsUpdating(false);
			})
			.catch((err) => {
				if (err.response.data.message === 'Bad user id' || err.response.data.message === 'Password not match') {
					setUpdatedCorrectly(err.response.data.message);
				} else {
					setIsError(true);
				}
				setIsUpdating(false);
			});
	};

	return (
		<Container textAlign="center">
			<Header size="huge" className="to-upper-case">
				Mi perfil
			</Header>
			<Copyright />
			<br />
			<br />
			<Grid centered columns={2} stackable>
				<Grid.Column>
					<Header size="large"> Editar </Header>
					{isError && (
						<Message
							color="black"
							header="Algo anda mal..."
							content="Intente de nuevo o contacte al administrador"
						/>
					)}
					{typeof updatedCorrectly === 'boolean' && (
						<Message color="green" header="Se actualizó la contraseña correctamente." />
					)}
					{updatedCorrectly === 'Password not match' && (
						<Message
							color="red"
							header="No se pudo actualizar su contraseña"
							content="Asegurese que ingreso su contraseña actual correctamente"
						/>
					)}
					{updatedCorrectly === 'Bad user id' && (
						<Message
							color="red"
							header="No se pudo actualizar"
							content="Ha sido bloquedo, inicie sesión nuevamente"
						/>
					)}
					{isUpdating ? (
						<Loader />
					) : (
						<Form onSubmit={handleSubmit(onSubmitHandler)}>
							<Form.Field required>
								{errors.current_password && (
									<Message negative>
										<p> {errors.current_password.message} </p>
									</Message>
								)}
								<label>Contraseña Actual</label>
								<input
									placeholder="password"
									ref={register({
										required: 'Por favor ingrese su contraseña actual',
										maxLength: { value: 30, message: 'La contraseña es muy larga' },
										minLength: {
											value: 6,
											message: 'La contraseña debe tener al menos 6 carácteres'
										}
									})}
									name="current_password"
									autoComplete="on"
									type="password"
								/>
							</Form.Field>
							<Form.Field required>
								{errors.new_password && (
									<Message negative>
										<p> {errors.new_password.message} </p>
									</Message>
								)}
								<label>Contraseña Nueva</label>
								<input
									placeholder="password"
									ref={register({
										required: 'Por favor ingrese una nueva contraseña',
										maxLength: { value: 30, message: 'La contraseña es muy larga' },
										minLength: {
											value: 6,
											message: 'La contraseña debe tener al menos 6 carácteres'
										}
									})}
									name="new_password"
									type="password"
									autoComplete="on"
								/>
							</Form.Field>
							<Form.Field required>
								{errors.confirm_password && (
									<Message negative>
										<p> {errors.confirm_password.message} </p>
									</Message>
								)}
								<label>Confirmar Contraseña Nueva</label>
								<input
									autoComplete="on"
									placeholder="password"
									ref={register({
										required: 'Por favor confirme su nueva contraseña',
										maxLength: { value: 30, message: 'La contraseña es muy larga' },
										minLength: {
											value: 6,
											message: 'La contraseña debe tener al menos 6 carácteres'
										},
										validate: (value) =>
											value === watch('new_password') || 'Las contraseñas no coinciden'
									})}
									name="confirm_password"
									type="password"
								/>
							</Form.Field>
							<Button basic color="teal" className="margin-top" type="submit">
								Actualizar
							</Button>
						</Form>
					)}
				</Grid.Column>

				<Grid.Row centered columns={4}>
					<Grid.Column />
					<Grid.Column>
						<Header size="large"> Datos </Header>
						<p className="margin-top"> Usuario: </p>
						<Header size="medium" as="p">
							{currentUser.username}
						</Header>
						{/* <p className="margin-top"> Nombre: </p>
						<Header size="medium" as="p">
							nombre
						</Header>
						<p className="margin-top"> Apellido Paterno: </p>
						<Header size="medium" as="p">
							app paterno
						</Header>
						<p className="margin-top"> Apellido Materno: </p>
						<Header size="medium" as="p">
							app materno
						</Header> */}
					</Grid.Column>
					<Grid.Column>
						<Header size="large" className="margin-top">
							Información
						</Header>
						{/* <p className="margin-top"> Formatos Llenados/Editados </p>
						<Label color="blue" size="medium">
							<Icon name="chart bar" />
							12 Formatos
						</Label> */}
						<p className="margin-top"> Historial </p>
						<Button
							icon
							basic
							color="black"
							fluid
							labelPosition="left"
							as={NavLink}
							to={`/historial/${currentUser._id}`}
						>
							Ir al historial
							<Icon name="history" />
						</Button>
					</Grid.Column>
					<Grid.Column />
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default UserProfile;
