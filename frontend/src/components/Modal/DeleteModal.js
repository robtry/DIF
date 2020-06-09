import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Header, Loader, Dimmer, Message } from 'semantic-ui-react';
import axios from '../../util/axios';

const DeleteModal = (props) => {
	// Control the modal
	const [ isOpenModel, setModelState ] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	//control the spinner
	const [ isDeleting, setDelitingState ] = useState(false);
	const [ errorDeleting, setErrorDeleting ] = useState(false);

	const deleteRecord = () => {
		//console.log('Deleting', props.path)
		setDelitingState(true);
		axios
			.delete(props.path)
			.then(() => {
				setDelitingState(false);
				setErrorDeleting(false);
				handleClose();
				props.refresh();
			})
			.catch((err) => {
				setErrorDeleting(true);
				console.log('Delete error', err)
			});
	};

	return (
		<Modal
			trigger={
				// <Button icon onClick={handleOpen}>
				// 	<Icon name="trash" />
				// </Button>
				<Button animated="vertical" basic color="red" onClick={handleOpen}>
					<Button.Content visible>
						<Icon name="trash" />
					</Button.Content>
					<Button.Content hidden>Borrar</Button.Content>
				</Button>
			}
			closeIcon
			dimmer="blurring"
			open={isOpenModel}
			onClose={handleClose}
			centered={false}
		>
			<Header icon="trash alternate outline" content="¿Está seguro que desea eliminar?" />
			<Modal.Content>
				{isDeleting ? (
					<Dimmer active>
						<Loader />
					</Dimmer>
				) : errorDeleting ? (
					<Message negative>
						<Message.Header>Algo salio mal..</Message.Header>
						<p>No se puede borrar este registro, es probable que tenga dependencias</p>
					</Message>
				) : (
					<p> Se borrará el registro: "{props.message}"</p>
				)}
			</Modal.Content>
			{!errorDeleting ? (
				<Modal.Actions>
					<Button color="red" onClick={handleClose}>
						<Icon name="remove" /> No
					</Button>
					<Button color="green" onClick={deleteRecord}>
						<Icon name="checkmark" /> Si
					</Button>
				</Modal.Actions>
			) : (
				<Modal.Actions>
					<Button color="red" onClick={handleClose}>
						<Icon name="remove" /> Cerrar
					</Button>
				</Modal.Actions>
			)}
		</Modal>
	);
};

DeleteModal.propTypes = {
	/** Id para hacer el Delete */
	path: PropTypes.string.isRequired,
	/** Mensaje dentro del contenido del diálogo */
	message: PropTypes.string.isRequired,
	/** refresh index */
	refresh: PropTypes.func.isRequired
};

export default DeleteModal;
