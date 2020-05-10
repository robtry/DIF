import React, { useState } from 'react';
import { Modal, Button, Container, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
//import { useFetchDetails } from '../../util/useFetchDetails';

const ShowModal = (props) => {
	// para saber cuando hacer el resquest
	const [ isOpenModel, setModelState ] = useState(false);
	const handleOpen = () => setModelState(true);
	const handleClose = () => setModelState(false);

	//get info
	//const { isLoading, data, loadData, notFound } = useFetchDetails(props.id);

	// useEffect(
	// 	() => {
	// 		if (isOpenModel) {
	// 			loadData();
	// 		}
	// 	},
	// 	[ isOpenModel, loadData ]
	// );

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
			<Modal.Content>
				<Container>{<props.Body item={props.item} isFormatMode={false} />}</Container>
			</Modal.Content>
		</Modal>
	);
};

ShowModal.propTypes = {
	/** Item para hacer load de lo necesario */
	item: PropTypes.object.isRequired,
	/** Form */
	Body: PropTypes.elementType.isRequired
};

export default ShowModal;
