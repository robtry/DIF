import React from 'react';
import { Container, Header, Button, Form, Grid, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
//own
//hoc
//context
//css

/**
 * Authentication page, no hay página de registro,
 * todos los usuarios los da de alta el admin.
*/

const Auth = () => {

	const { register, handleSubmit, errors} = useForm();
	const onSubmit = data => {
		console.log(data);
	}

	return <Container textAlign="center">
		<Header size="huge"> DIF | Naucalpan </Header>
		<p> created by <a href='https://robtry.github.io/'> Rob </a> </p>
		<p> ITESM CEM Servicio Social 2020 </p>
		<div style={{paddingTop : '7em'}}></div>
		<Grid columns='three' divided>
		<Grid.Row>
			<Grid.Column />
			<Grid.Column>
				<Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
					<Form.Field required>
						{ errors.username && errors.username.type === 'required' && <Message negative>
							<Message.Header>Campo requerido</Message.Header>
							<p> Por favor ingrese un usuario válido </p>
						</Message> }
						<label>Usuario</label>
						<input placeholder='username' ref={register({ required: true })} name='username' type='text'/>
					</Form.Field>
					<Form.Field required>
						{ errors.password && errors.password.type === 'required' && <Message negative>
							<Message.Header>Campo requerido</Message.Header>
							<p> Por favor ingrese su contraseña </p>
						</Message> }
						<label>Contraseña</label>
						<input placeholder='password' ref={register({ required: true })} name='password' type='password'/>
					</Form.Field>
					<Button basic color='teal' type='submit'>Ingresar</Button>
				</Form>
			</Grid.Column>
			<Grid.Column/>
		</Grid.Row>
		</Grid>
	</Container>;
}

export default Auth;
