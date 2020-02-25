import React from 'react';
import { Table, Button, Icon }  from 'semantic-ui-react';

/**
 * Debe estar dentro de una tabla,
 * contiene los botones de editar, ver detalles y eliminar
*/

const CrudButton = () => {
	return (
		<Table.Cell textAlign='center'>
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
	);
}

/** @component */
export default CrudButton;