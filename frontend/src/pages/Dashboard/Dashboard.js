import React, { useEffect, useState } from 'react';
import { Container, Header, Grid, Card, Feed} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
// http://recharts.org/en-US/
//own
import Copyright from '../../components/Copyright';
import FormatChart from './Charts/Formats';
//import NNAsChart from './Charts/NNAs';
import Loader from '../../components/Loader/MainLoader';
import { useFetchDetails } from '../../util/useFetchDetails';

import defaultUser from '../../assets/default.png';

const Dashboard = () => {
	const { isLoading, data, loadData } = useFetchDetails('/dashboard');

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	//console.log(data[0]);

	const [ width, setWidth ] = useState(window.innerWidth);

	useEffect(
		() => {
			window.addEventListener('resize', () => {
				setWidth(window.innerWidth);
			});
		},
		[ setWidth ]
	);

	return (
		<Container textAlign="center">
			<Header size="huge"> DIF | Naucalpan | </Header>
			<Copyright />
			<Grid divided="vertically">
				{/* <Grid.Row columns={1}>
					<Grid.Column>
						<Header>NNA's </Header>
						<NNAsChart size={width} />
						{isLoading ? <Loader /> : <NNAsChart />}
					</Grid.Column>
				</Grid.Row> */}
				<Grid.Row columns={1}>
					<Grid.Column>
						<Header> Formatos Editados/Creados </Header>
						{isLoading ? (
							<Loader />
						) : (
							<FormatChart
								size={width}
								modificados={data[0] ? data[0].modificados : []}
								creados={data[0] ? data[0].creados : []}
							/>
						)}
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
									{data[0] &&
										data[0].historial.reverse().map((item) => {
											return (
												<Feed.Event key={item._id}>
													<Feed.Label image={defaultUser} />
													<Feed.Content>
														<Feed.Date
															content={new Date(item.fecha).toLocaleString('es')}
														/>
														<Feed.Summary>
															{/* <a href="/">Jenny Hess</a> modificó <a href="/">formato</a>. */}
															<NavLink to={'/historial/' + item.id_usuario}>
																{item.usuario.nombre}
															</NavLink>&nbsp;
															{item.accion_formato}&nbsp;
															<NavLink to={'/formato/' + item.id_formato}>
																formato
															</NavLink>
														</Feed.Summary>
													</Feed.Content>
												</Feed.Event>
											);
										})}
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
