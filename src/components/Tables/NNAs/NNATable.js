import React from 'react';
import { Table, Button, Icon, Pagination } from 'semantic-ui-react';
// own
import Formats from './AccordionFormats/AccordionFormats';

/**
 * Es la tabla que se muestra los NNAs
*/

const RealTable = () => (
	<React.Fragment>
	<Table striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Expediente</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Formatos</Table.HeaderCell>
				<Table.HeaderCell>Acciones</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>John Lilki</Table.Cell>
				<Table.Cell>September 14, 2013</Table.Cell>
				<Table.Cell> <Formats /> </Table.Cell>
				<Table.Cell>
					<Button.Group>
						<Button icon>
							<Icon name='eye' />
						</Button>
						<Button icon>
							<Icon name='edit' />
						</Button>
						<Button icon>
							<Icon name='trash' />
						</Button>
					</Button.Group>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
	<div className="float-right">
	<Pagination
		boundaryRange={0}
		defaultActivePage={1}
		ellipsisItem={null}
		firstItem={null}
		lastItem={null}
		siblingRange={2}
		totalPages={10}
	/></div>
	</React.Fragment>
)

export default RealTable;
