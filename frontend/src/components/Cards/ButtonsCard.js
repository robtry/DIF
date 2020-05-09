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
	const isAdmin = useContext(UserContext).isAdmin;
	return (
		<React.Fragment>
			<Button.Group fluid>
				{/* <Button basic color="grey">
					Imprimir
				</Button> */}
				<OnShow
					id={props.id}
					title={props.title}
					Body={props.type === 'template' ? TemplatePreview : FormatPreview}
				/>
				{isAdmin && ( //other types
					// <Button
					// 	basic
					// 	color="teal"
					// 	as={NavLink}
					// 	to={props.type === 'template' ? '/plantilla/1' : '/formato/1'}
					// 	exact
					// >
					// 	Modificar
					// </Button>
					<Button
						animated="fade"
						basic
						color="black"
						as={NavLink}
						to={
							props.type === 'template' ? (
								'/plantilla/' + props.id.replace('templates/', '')
							) : (
								'/formato/1'
							)
						}
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
	/** Id to get something */
	id: PropTypes.string.isRequired,
	/** Para saber que botones mostrar */
	type: PropTypes.oneOf([ 'template', 'format' ]).isRequired,

	title: PropTypes.string.isRequired
};

export default ButtonsCard;
