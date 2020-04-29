import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import defaultUser from '../../../assets/default.png';
/**
 * Es la tabla que se usa para el index de el historial
*/

const UserHistoryTable = () => (
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
					<Feed.Event>
						<Feed.Label image={defaultUser} />
						<Feed.Content>
							<Feed.Date content="1 day ago" />
							<Feed.Summary>
								<a href="/">Jenny Hess</a> modificó <a href="/">formato</a>.
							</Feed.Summary>
						</Feed.Content>
					</Feed.Event>

					<Feed.Event>
						<Feed.Label image={defaultUser} />
						<Feed.Content>
							<Feed.Date content="3 days ago" />
							<Feed.Summary>
								<a href="/">Molly Malone</a> modificó <a href="/">formato</a>.
							</Feed.Summary>
						</Feed.Content>
					</Feed.Event>

					<Feed.Event>
						<Feed.Label image={defaultUser} />
						<Feed.Content>
							<Feed.Date content="4 days ago" />
							<Feed.Summary>
								<a href="/">Elliot Baker</a> creó <a href="/">formato</a>
							</Feed.Summary>
						</Feed.Content>
					</Feed.Event>
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
