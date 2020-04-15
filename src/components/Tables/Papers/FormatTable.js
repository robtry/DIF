import React from 'react';
import { Table }  from 'semantic-ui-react';
// own
import ButtonsCard from '../../Cards/ButtonsCard';


/**
 * Es la tabla que se usa para el index de el historial de los formatos
*/

const TemplateTable = () => (
	<React.Fragment>
	<br /><br />
	<Table striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Plantilla</Table.HeaderCell>
				<Table.HeaderCell>NNA</Table.HeaderCell>
				<Table.HeaderCell>Última edición</Table.HeaderCell>
				<Table.HeaderCell>Acciones sobre el formato</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>Derechos del NNA</Table.Cell>
				<Table.Cell>Juan</Table.Cell>
				<Table.Cell>14-02-19 12:34:15</Table.Cell>
				<Table.Cell>
					<ButtonsCard
						id={1}
						type='format'
						title='Derechos del NNA | Ramón Sosa'
					/>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
	</React.Fragment>
)

export default TemplateTable;