import React from 'react';
import { Header, Table, Container } from 'semantic-ui-react';
//own
import Copyright from '../../components/Copyright/index';
import Loader from '../../components/Loader';
import { useFetch } from '../../util/useFetch';
import FormatCard from '../../components/Cards/FormatCard';

const History = (props) => {
	const { isLoading /*data*/ } = useFetch();

	return (
		<Container textAlign="center">
			<Copyright />
			{isLoading ? (
				<Loader />
			) : (
				<React.Fragment>
					<Header size="huge"> |Nombre completo| </Header>
					<Table striped textAlign="center">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Dato</Table.HeaderCell>
								<Table.HeaderCell>Info</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>Expediente</Table.Cell>
								<Table.Cell>
									<b>ASLFALDMSL</b>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Fecha de nacimiento</Table.Cell>
								<Table.Cell>
									<b>una fecha</b>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Sexo</Table.Cell>
								<Table.Cell>
									<b>MAsculino o femenino</b>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Peso</Table.Cell>
								<Table.Cell>
									<b>53.2 kg</b>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Talla</Table.Cell>
								<Table.Cell>
									<b>1.21 mts</b>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Escolaridad</Table.Cell>
								<Table.Cell>
									<b>Primaria</b>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
					<Header size="huge"> Formatos </Header>
					<Header> Trabajo social </Header>
					<Header> Psicológico </Header>
					<FormatCard id={4}/>
					<Header> Legal </Header>
					<Header> Medicina </Header>
				</React.Fragment>
			)}
		</Container>
	);
};

export default History;
