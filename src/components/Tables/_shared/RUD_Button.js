import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
// own
import DeleteModal from '../../Modal/DeleteModal';
import EditModal from '../../Modal/_CUModal';

/**
 * Debe estar dentro de una tabla,
 * contiene los botones de editar, ver detalles y eliminar
*/

const CrudButton = (props) => {
	//console.log('[RUD]', props)

	return (
		<Button.Group fluid>
			{props.onEdit && <EditModal id={props.id} Form={props.onEdit} isEditing refresh={props.refresh} />}
			{props.onDelete && <DeleteModal message={props.onDelete} id={props.id} refresh={props.refresh} />}
		</Button.Group>
	);
};

CrudButton.propTypes = {
	/** El id para hacer el request al API solo para eliminar */
	id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	/** Mensaje que se muestra cuando aparece el dialogo de elimar*/
	onDelete: PropTypes.string,
	/** Componente que se rendera cuando se hara una edición */
	onEdit: PropTypes.elementType,
	/** refresh index */
	refresh: PropTypes.func.isRequired
};

/** @component */
export default React.memo(CrudButton);
//export default CrudButton;
