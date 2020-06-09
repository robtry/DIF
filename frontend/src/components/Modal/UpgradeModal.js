import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Header, Loader, Dimmer, Message } from 'semantic-ui-react';
import axios from '../../util/axios';

const UpgradeModal = (props) => {
	// Control the modal
	const [ isOpenModel, setModelState ] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	//control the spinner
	const [ isReseting, setIsReseting ] = useState(false);
	const [ errorReseting, setErrorReseting ] = useState(false);

	const changeStatus = (id) => {
		setIsReseting(true);
		axios
			.post('/nnas/status/' + id, { estatus: props.value === 'in' ? 'out' : 'in' })
			.then(() => {
				setIsReseting(false);
				setErrorReseting(false);
				handleClose();
				props.refresh();
			})
			.catch((err) => {
				setErrorReseting(true);
				console.log('change status error', err);
			});
	};

	return (
		<Modal
			trigger={
				// <Button icon onClick={handleOpen}>
				// 	<Icon name="trash" />
				// </Button>
				<Button icon basic color="orange" onClick={handleOpen}>
					<Icon name={props.value === 'in' ? 'bookmark outline' : 'bookmark'} />
				</Button>
			}
			closeIcon
			dimmer="blurring"
			open={isOpenModel}
			onClose={handleClose}
			centered={false}
		>
			<Header icon="erase" content="¿Está seguro que desea cambiar el estatus?" />
			<Modal.Content>
				{isReseting ? (
					<Dimmer active>
						<Loader />
					</Dimmer>
				) : errorReseting ? (
					<Message negative>
						<Message.Header>Algo salio mal..</Message.Header>
						<p>Por favor intente más tarde</p>
					</Message>
				) : (
					<p> Se cambiará el estatus de "{props.message}"</p>
				)}
			</Modal.Content>
			{!errorReseting ? (
				<Modal.Actions>
					<Button color="red" onClick={handleClose}>
						<Icon name="remove" /> No
					</Button>
					<Button color="green" onClick={() => changeStatus(props.id)}>
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

UpgradeModal.propTypes = {
	/** Mensaje dentro del contenido del diálogo */
	message: PropTypes.string.isRequired,
	/** refresh index */
	refresh: PropTypes.func.isRequired,
	/** del nna */
	id: PropTypes.string.isRequired,
	/** to change value */
	value: PropTypes.string.isRequired
};

export default UpgradeModal;
