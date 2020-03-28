import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import TemplateDetails from '../../pages/Papers/TemplateDetails';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
//own
import OnShow from '../Details/ShowPapersModal';
//context
import UserContext from '../../context/userContext';

const ButtonsCard = (props) => {
	const isAdmin = useContext(UserContext).isAdmin;
	return (
		<React.Fragment>
			<Button.Group>
				{/* <Button basic color="grey">
					Imprimir
				</Button> */}
				<OnShow id={props.id} title={props.title} Body={TemplateDetails} />
				{isAdmin && ( //other types
					<Button
						basic
						color="teal"
						as={NavLink}
						to={props.type === 'template' ? '/plantilla/1' : '/formato/1'}
						exact
					>
						Modificar
					</Button>
				)}
			</Button.Group>
		</React.Fragment>
	);
};

ButtonsCard.propTypes = {
	/** Id to get something */
	id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	/** Para saber que botones mostrar */
	type: PropTypes.oneOf([ 'template', 'format' ]).isRequired
};

export default ButtonsCard;