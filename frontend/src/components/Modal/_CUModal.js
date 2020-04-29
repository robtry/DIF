import React, { useState } from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CUModal = (props) => {
	//console.log('Modal',props);
	// Control the modal
	const [ isOpenModel, setModelState ] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	return (
		<Modal
			trigger={
				props.item ? (
					// is editing
					<Button animated="vertical" basic color="teal" onClick={handleOpen}>
						<Button.Content visible>
							<Icon name="edit" />
						</Button.Content>
						<Button.Content hidden>Editar</Button.Content>
					</Button>
				) : (
					<Button primary basic icon labelPosition="left" onClick={handleOpen}>
						<Icon name="add" /> {props.message}
					</Button>
				)
			}
			closeIcon
			centered={false}
			open={isOpenModel}
			onClose={handleClose}
			dimmer="inverted"
		>
			<Header
				icon={props.item ? 'edit' : 'add square'}
				content={props.item ? '¿Está seguro que desea actualizar?' : props.message}
			/>
			<Modal.Content>
				<props.Form handleClose={() => handleClose()} refresh={props.refresh} item={props.item} />
			</Modal.Content>
		</Modal>
	);
};

CUModal.propTypes = {
	/** Form for edit o create*/
	Form: PropTypes.elementType.isRequired,
	/** Leyenda del boton, solo cuando se esta editando */
	message: PropTypes.string,
	/** Para saber si esta editando */
	item: PropTypes.object,
	/** Para hacer un reload de la info */
	refresh: PropTypes.func.isRequired
};

export default CUModal;
