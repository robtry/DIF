import React, { useContext } from "react";
import {
	Container,
	Header,
	Button,
	Form,
	Message,
	Grid
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
//own
import Copyright from "../../components/Copyright";
//context
import UserContext from "../../context/userContext";
//css

/**
 * Authentication page, no hay página de registro,
 * todos los usuarios los da de alta el admin.
 */

const AuthPage = () => {

	const logIn = useContext(UserContext).authUser;

	//form
	const { register, handleSubmit, errors } = useForm();
	const onSubmitHandler = data => {
		console.log(data);
		logIn(data.username, data.password);
	};

	return (
		<Container textAlign="center">
			<Header size="huge"> DIF | Naucalpan </Header>
			<Copyright />
			<div style={{ paddingTop: "7em" }}></div>
			<Grid columns={3}>
				<Grid.Row>
					<Grid.Column only="computer" />
					<Grid.Column only="tablet" tablet="three" />
					<Grid.Column mobile="sixteen" tablet="ten" computer="six">
						<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
							<Form.Field required>
								{errors.username && errors.username.type === "required" && (
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
								{errors.password && errors.password.type === "required" && (
									<Message negative>
										<Message.Header>Campo requerido</Message.Header>
										<p> Por favor ingrese su contraseña </p>
									</Message>
								)}
								<label>Contraseña</label>
								<input
									placeholder="password"
									ref={register({ required: true })}
									name="password"
									type="password"
								/>
							</Form.Field>
							<Button basic color="teal" type="submit">
								Ingresar
							</Button>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default AuthPage;
