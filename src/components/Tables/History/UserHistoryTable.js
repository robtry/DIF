import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own


/**
 * Es la tabla que se usa para el index de el historial
*/

const UserHistoryTable = () => (
	<React.Fragment>
		<br /><br /><br />
		<Table striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Plantilla</Table.HeaderCell>
					<Table.HeaderCell>NNA</Table.HeaderCell>
					<Table.HeaderCell>Modificación</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Derechos del NNA</Table.Cell>
					<Table.Cell>Juan</Table.Cell>
					<Table.Cell>14-02-19 12:34:15</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	</React.Fragment>
)

UserHistoryTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
}

export default UserHistoryTable;