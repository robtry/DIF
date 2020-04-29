import React from 'react';
import { Item, Table, Container } from 'semantic-ui-react';
//own
import Copyright from '../../components/Copyright/index';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';
import FormatPage from '../Papers/FormatIndex';
import defaultImage from '../../assets/defaultNNA.png';

/**
 * Child details
*/

const History = (props) => {
	const { isLoading /*data*/ } = useFetch();

	return (
		<Container textAlign="center">
			<Copyright />
			{isLoading ? (
				<Loader />
			) : (
				<React.Fragment>
					<Item.Group className="center-item">
						<Item>
							<Item.Image size="tiny" src={defaultImage} />
							<Item.Content verticalAlign="middle">
								<Item.Header>Nombre Completo</Item.Header>
							</Item.Content>
						</Item>
					</Item.Group>
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
					<FormatPage />
				</React.Fragment>
			)}
		</Container>
	);
};

export default History;
