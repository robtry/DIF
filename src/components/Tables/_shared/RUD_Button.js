import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
// own
import DeleteModal from './DeleteModal';
import EditModal from '../../Forms/_CUModal';

/**
 * Debe estar dentro de una tabla,
 * contiene los botones de editar, ver detalles y eliminar
*/

const CrudButton = (props) => {
	//console.log('[RUD]', props)
	return (
		<Table.Cell textAlign='center'>
			<Button.Group>
				{
					props.onEdit &&
					<EditModal id={props.id} Form={props.onEdit} isEditing refresh={props.refresh} />
				}
				{
					props.onDelete &&
					<DeleteModal message={props.onDelete} id={props.id} refresh={props.refresh} />
				}
			</Button.Group>
		</Table.Cell>
	);
}

CrudButton.propTypes = {
	/** El id para hacer el request al API solo para eliminar */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/** Mensaje que se muestra cuando aparece el dialogo de elimar*/
	onDelete: PropTypes.string,
	/** Componente que se rendera cuando se hara una edición */
	onEdit: PropTypes.elementType,
	/** refresh index */
	refresh: PropTypes.func.isRequired,
}

/** @component */
export default React.memo(CrudButton);
//export default CrudButton;