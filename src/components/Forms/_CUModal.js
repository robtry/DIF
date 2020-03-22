import React, { useState } from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
//hoc
//context
//css

const CUModal = props => {
	// Control the modal
	const [isOpenModel, setModelState] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	return (
		<Modal
			trigger={
				props.isEditing ? (
					<Button icon onClick={handleOpen}>
						{' '}
						<Icon name="edit" />{' '}
					</Button>
				) : (
					<Button primary icon labelPosition="left" onClick={handleOpen}>
						{' '}
						<Icon name="add" /> {props.message}{' '}
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
				icon={props.isEditing ? 'edit' : 'add square'}
				content={
					props.isEditing ? '¿Está seguro que desea actualizar?' : props.message
				}
			/>
			<Modal.Content>
				{
					<props.Form
						id={props.id}
						isEditing={props.isEditing}
						handleClose={() => handleClose()}
						refresh={props.refresh}
					/>
				}
			</Modal.Content>
		</Modal>
	);
};

CUModal.propTypes = {
	/** Id para hacer el Update */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Form for edit o create*/
	Form: PropTypes.elementType.isRequired,
	/** Leyenda del boton, solo cuando se esta editando */
	message: PropTypes.string,
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** Para hacer un reload de la info */
	refresh: PropTypes.func.isRequired
};

export default CUModal;
