import React, { useContext } from 'react';
import { Container, Header, Button, Form, Message, Grid } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
//own
import Copyright from '../../components/Copyright';
import Loader from '../../components/Loader/MainLoader';
//context
import UserContext from '../../context/userContext';
//css

/**
 * Authentication page, no hay página de registro,
 * todos los usuarios los da de alta el admin.
 */

const AuthPage = () => {
	const { errorInAuth, clearError, logIn, isLoading } = useContext(UserContext);

	//form
	const { register, handleSubmit, errors, reset } = useForm();
	const onSubmitHandler = (data) => {
		//console.log(data);
		clearError(false); //set to false
		logIn(data.username, data.password);
		reset();
	};

	return (
		<Container textAlign="center">
			<Header size="huge"> DIF | Naucalpan </Header>
			<Copyright />
			<div style={{ paddingTop: '7em' }} />
			{isLoading ? (
				<Loader />
			) : (
				<Grid columns={3}>
					<Grid.Row>
						<Grid.Column only="computer" />
						<Grid.Column only="tablet" tablet="three" />
						<Grid.Column mobile="sixteen" tablet="ten" computer="six">
							{typeof errorInAuth === 'boolean' &&
							errorInAuth && (
								<Message
									color="black"
									header="Algo anda mal..."
									content="Intente volviendo a cargar el sitio o contacte al administrador"
								/>
							)}
							{
								<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
									{errorInAuth === 'Log in failed' && (
										<Message
											color="red"
											header="Usuario o contraseña incorrectos"
											content="Ingrese nuevamente sus credenciales"
										/>
									)}
									<Form.Field required>
										{errors.username &&
										errors.username.type === 'required' && (
											<Message negative>
												<Message.Header>Campo requerido</Message.Header>
												<p> Por favor ingrese un usuario válido </p>
											</Message>
										)}
										<label>Usuario</label>
										<input
											placeholder="username"
											ref={register({ required: true })}
											name="username"
											type="text"
										/>
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
									<Button basic color="teal" type="submit">
										Ingresar
									</Button>
								</Form>
							}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)}
		</Container>
	);
};

export default AuthPage;
