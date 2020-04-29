import React, { useState, useEffect } from 'react';
import { Modal, Button, Header, Container, Dimmer, Loader, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import { useFetchDetails } from '../../util/useFetchDetails';

const ShowModal = (props) => {
	// para saber cuando hacer el resquest
	const [ isOpenModel, setModelState ] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	//get info
	const { isLoading, data, loadData } = useFetchDetails(props.id);

	useEffect(
		() => {
			if (isOpenModel) {
				loadData();
			}
		},
		[ isOpenModel, loadData ]
	);

	return (
		<Modal
			trigger={
				<Button animated="fade" onClick={handleOpen} basic color="black">
					<Button.Content visible>Revisar</Button.Content>
					<Button.Content hidden>
						<Icon name="eye" />
					</Button.Content>
				</Button>
			}
			closeIcon
			centered={false}
			onClose={handleClose}
			open={isOpenModel}
		>
			<Header>{props.title}</Header>
			<Modal.Content>
				{isLoading ? (
					<Dimmer active>
						<Loader />
					</Dimmer>
				) : (
					<Container>{<props.Body id={props.id} data={data} />}</Container>
				)}
			</Modal.Content>
		</Modal>
	);
};

ShowModal.propTypes = {
	/** Id para hacer el get */
	id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	/** Es un header dentro del modal */
	title: PropTypes.string,
	/** Body si details esta disponible */
	Body: PropTypes.elementType.isRequired
};

export default ShowModal;
