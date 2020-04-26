import React, { useEffect } from 'react';
import { Container, Header, Grid, Card, Feed } from 'semantic-ui-react';
// http://recharts.org/en-US/
//own
import Copyright from '../../components/Copyright';
import FormatChart from './Charts/Formats';
import NNAsChart from './Charts/NNAs';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';

import defaultUser from '../../assets/default.png';

const Dashboard = () => {
	const { isLoading } = useFetch();

	useEffect(() => {
		console.log('[Dashboard.js] | fetching data for dashboard');
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
						<Card centered fluid>
							<Card.Content>
								<Card.Header>Últimos movimientos</Card.Header>
							</Card.Content>
							<Card.Content>
								<Feed>
									<Feed.Event>
										<Feed.Label image={defaultUser} />
										<Feed.Content>
											<Feed.Date content="1 day ago" />
											<Feed.Summary>
												<a href='/'>Jenny Hess</a> modificó <a href='/'>formato</a>.
											</Feed.Summary>
										</Feed.Content>
									</Feed.Event>

									<Feed.Event>
										<Feed.Label image={defaultUser} />
										<Feed.Content>
											<Feed.Date content="3 days ago" />
											<Feed.Summary>
												<a href='/'>Molly Malone</a> modificó <a href='/'>formato</a>.
											</Feed.Summary>
										</Feed.Content>
									</Feed.Event>

									<Feed.Event>
										<Feed.Label image={defaultUser} />
										<Feed.Content>
											<Feed.Date content="4 days ago" />
											<Feed.Summary>
												<a href='/'>Elliot Baker</a> creó <a href='/'>formato</a>
											</Feed.Summary>
										</Feed.Content>
									</Feed.Event>
								</Feed>
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default Dashboard;
