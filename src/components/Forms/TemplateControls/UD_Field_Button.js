import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
// own
import DeleteModal from '../../Modal/DeleteModal';
import EditModal from '../../Modal/_CUModal';

/**
 * Debe estar dentro de una tabla,
 * contiene los botones de editar y eliminar
 * USO ÚNICO DE LOS CAMPOS DE LAS PLANTILLAS
*/

const UDFieldButton = (props) => {
	return (
		<Table.Cell textAlign='center'>
			<Button.Group>
					<EditModal id={props.id} Form={props.onEdit} isEditing refresh={props.refresh} />
					<DeleteModal message={props.onDelete} id={props.id} refresh={props.refresh} />
			</Button.Group>
		</Table.Cell>
	);
}

UDFieldButton.propTypes = {
	/** El id para hacer el request al API solo para eliminar */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/** Mensaje que se muestra cuando aparece el dialogo de elimar*/
	onDelete: PropTypes.string.isRequired,
	/** Componente que se rendera cuando se hara una edición */
	onEdit: PropTypes.elementType.isRequired,
	/** refresh index */
	refresh: PropTypes.func.isRequired,
}

/** @component */
export default React.memo(UDFieldButton);