import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NNADetails = ({ item }) => {
	return (
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
						<b>{item.expediente}</b>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Fecha de nacimiento</Table.Cell>
					<Table.Cell>
						<b>{item.fecha_nacimiento ? item.fecha_nacimiento.split('T')[0] : ''}</b>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Sexo</Table.Cell>
					<Table.Cell>
						<b>{item.sexo === 'h' ? 'Hombre' : 'Mujer'}</b>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};

NNADetails.propTypes = {
	item: PropTypes.object.isRequired
};

export default NNADetails;
