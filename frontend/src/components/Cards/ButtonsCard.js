import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
//own
import OnShow from '../Details/ShowPapersModal';
import TemplatePreview from '../../pages/Papers/TemplatePreview';
import FormatPreview from '../../pages/Papers/FormatPreview';

//context
import UserContext from '../../context/userContext';

/** Botones para el card de los formatos y templates */

const ButtonsCard = (props) => {
	const { isAdmin, currentUser } = useContext(UserContext);
	return (
		<React.Fragment>
			<Button.Group fluid>
				{/* <Button basic color="grey">
					Imprimir
				</Button> */}
				<OnShow
					title={props.type === 'template' ? props.item.nombre : props.item._id.plantilla.nombre}
					item={props.item}
					Body={props.type === 'template' ? TemplatePreview : FormatPreview}
					nna={props.nna}
				/>
				{(isAdmin ||
					(props.type === 'template' ? true : props.item._id.plantilla.tipo === currentUser.tipo)) && (
					<Button
						animated="fade"
						basic
						color="black"
						as={NavLink}
						to={props.type === 'template' ? '/plantilla/' + props.id : '/formato/' + props.id}
						exact
					>
						<Button.Content visible>Modificar</Button.Content>
						<Button.Content hidden>
							<Icon name="write" />
						</Button.Content>
					</Button>
				)}
			</Button.Group>
		</React.Fragment>
	);
};

ButtonsCard.propTypes = {
	/**  */
	id: PropTypes.string.isRequired,
	/** Para saber que botones mostrar */
	type: PropTypes.oneOf([ 'template', 'format' ]).isRequired,
	/** Item para hacer load de lo necesario */
	item: PropTypes.object.isRequired
};

export default ButtonsCard;
