import React from "react";
import { Container, Header, Grid, Form, Button, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
//own
import Copyright from "../../components/Copyright";
//context
//css

const UserProfile = () => {
	const { register, handleSubmit, errors } = useForm();
	const onSubmitHandler = data => {
		console.log(data);
	};

	return (
		<Container textAlign="center">
			<Header size="huge" className="to-upper-case"> Mi perfil </Header>
			<Copyright />
			<br />
			<br />
			<Grid centered columns={2}>
				<Grid.Column>
					<Header size="large"> Editar </Header>
					<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
						
							<Form.Field required>
								{ errors.current_password && errors.current_password.type === 'required' && <Message negative>
								<p> Por favor ingrese su contraseña actual </p>
							</Message> }
								<label>Contraseña Actual</label>
								<input placeholder='password'
									ref={register({ required: true })}
									name='current_password'
									type='password'
								/>
							</Form.Field>
							<Form.Field required>
								{ errors.current_password && errors.current_password.type === 'required' && <Message negative>
								<p> Por favor ingrese una nueva contraseña </p>
							</Message> }
								<label>Contraseña Nueva</label>
								<input placeholder='password'
									ref={register({ required: true })}
									name='new_password'
									type='password'
								/>
							</Form.Field>
							<Form.Field required>
								{ errors.current_password && errors.current_password.type === 'required' && <Message negative>
								<p> Por favor confirme su nueva contraseña </p>
							</Message> }
								<label>Confirmar Contraseña</label>
								<input placeholder='password'
									ref={register({ required: true })}
									name='confirm_password'
									type='password'
								/>
							</Form.Field>
						<Button basic color="teal" type="submit" className="margin-top">
							Actualizar
						</Button>
					</Form>
				</Grid.Column>

				<Grid.Row centered columns={4}>
					<Grid.Column />
					<Grid.Column>
						<Header size="large"> Datos </Header>
						<p className="margin-top"> Usuario: </p>
						<Header size="medium" as="p"> user </Header>
						<p className="margin-top"> Nombre: </p>
						<Header size="medium" as="p"> nombre </Header>
						<p className="margin-top"> Apellido Paterno: </p>
						<Header size="medium" as="p"> app paterno </Header>
						<p className="margin-top"> Apellido Materno: </p>
						<Header size="medium" as="p"> app materno </Header>
					</Grid.Column>
					<Grid.Column>
						<Header size="large" className="margin-top"> Información </Header>
						<p className="margin-top"> Formatos Llenados/Editados </p>
						<Header size="medium" as="p"> 15 </Header>
						<p className="margin-top"> Historial </p>
						<Button secondary as={NavLink} to="/historial/1" exact >Ir al historial</Button>
					</Grid.Column>
					<Grid.Column />
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default UserProfile;
