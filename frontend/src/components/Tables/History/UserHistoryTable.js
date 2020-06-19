import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// own
import defaultUser from '../../../assets/default.png';
/**
 * Es la tabla que se usa para el index de el historial
*/

const UserHistoryTable = (props) => (
	<React.Fragment>
		<br />
		<br />
		<br />
		<Card centered fluid>
			<Card.Content>
				<Card.Header>Últimos movimientos</Card.Header>
			</Card.Content>
			<Card.Content>
				<Feed>
					{props.data &&
						props.data.map((item) => {
							return (
								<Feed.Event key={item._id}>
									<Feed.Label image={defaultUser} />
									<Feed.Content>
										<Feed.Date content={new Date(item.fecha).toLocaleString('es')} />
										<Feed.Summary>
											{item.accion_formato ? (
												<React.Fragment>
													{`${item.usuario.nombre} ${item.accion_formato} `}
													{item.accion_formato !== 'eliminó' ? (
														<NavLink to={'/formato/' + item.id_formato}>formato</NavLink>
													) : (
														'formato'
													)}
												</React.Fragment>
											) : (
												<React.Fragment>
													{`${item.usuario.nombre} ${item.accion_nna} NNA `}
													{item.accion_nna !== 'eliminó' && (
														<NavLink to={'/nna/' + item.id_nna}>
															{item.nna.nombre_completo}
														</NavLink>
													)}
												</React.Fragment>
											)}
										</Feed.Summary>
									</Feed.Content>
								</Feed.Event>
							);
						})}
				</Feed>
			</Card.Content>
		</Card>
	</React.Fragment>
);

UserHistoryTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired
};

export default UserHistoryTable;
