import React, { useEffect } from "react";
import { Container, Header, Grid, Table } from "semantic-ui-react";
// http://recharts.org/en-US/
//own
import Copyright from "../../components/Copyright";
import FormatChart from "./Charts/Formats";
import NNAsChart from "./Charts/NNAs";
import Loader from '../../components/Loader';
import { useFetch } from '../../util/useFetch';

const Dashboard = () => {

	const { isLoading } = useFetch();

	useEffect(() => {
		console.log('[Dashboard.js] | fetching data for dashboard')
	}, []);

	return (
		<Container textAlign="center">
			<Header size="huge"> DIF | Naucalpan | </Header>
			<Copyright />
			<Grid divided="vertically">
				<Grid.Row columns={1}>
					<Grid.Column>
						<Header>NNA's </Header>
						{isLoading ? <Loader /> : <NNAsChart />}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Header> Formatos Editados </Header>
						<FormatChart />
					</Grid.Column>
					<Grid.Column>
						<Header>Formatos Creados</Header>
						<FormatChart />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Header> Últimos movimientos </Header>
						<Table compact>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Nombre</Table.HeaderCell>
									<Table.HeaderCell>Formato</Table.HeaderCell>
									<Table.HeaderCell>Hora</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell>John</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>None</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jamie</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>Requires call</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>John</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>None</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jamie</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>Requires call</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>John</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>None</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jamie</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>Requires call</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>John</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>None</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jamie</Table.Cell>
									<Table.Cell>Approved</Table.Cell>
									<Table.Cell>Requires call</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default Dashboard;
