import React, { useContext } from 'react';
import { Icon, Item, Grid, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AgeFromDateString } from 'age-calculator';
// own
//import Formats from './AccordionFormats/AccordionFormats';
import CrudButton from './_shared/RUD_Button';
import NNAForm from '../Forms/NNAForm';

import userContext from '../../context/userContext';

import defaultImage from '../../assets/defaultNNA.png';
import UpgradeModal from '../Modal/UpgradeModal';

const fileServer = process.env.REACT_APP_SERVER;
/**
 * Es la tabla que se muestra los NNAs
*/

const NNATable = (props) => {

	const { isAdmin } = useContext(userContext);

	return (
		<Item.Group relaxed className="center-item">
			{props.data.map((item) => {
				return (
					<Item key={item._id}>
						<Item.Image size="tiny" src={item.image ? fileServer + item.image : defaultImage} />
						<Item.Content>
							<Item.Header>
								{item.nombre} {item.app} {item.apm}
							</Item.Header>
							<Item.Meta>{item.expediente}</Item.Meta>
							<Item.Description>
								<Grid>
									<Grid.Row>
										<Grid.Column width={8}>
											<Button
												icon
												basic
												primary
												labelPosition="left"
												as={NavLink}
												to={'/nna/' + item._id}
											>
												Perfil
												<Icon name="user circle outline" />
											</Button>
											<UpgradeModal id={item._id} message={item.nombre} refresh={props.loadData} value={item.estatus} />
										</Grid.Column>
										<Grid.Column width={5} />
										<Grid.Column width={3}>
											{isAdmin && <CrudButton
												deletePath={'nnas/' + item._id}
												onDelete={item.nombre}
												onEdit={NNAForm}
												refresh={props.loadData}
												item={item}
											/>}
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Item.Description>
							<Item.Extra>
								<Label color="blue" size="mini">
									<Icon name="chart bar" />
									{item.formatos.length} Formato{item.formatos.length === 1 ? '' : 's'}
								</Label>
								<Label color="grey" size="mini">
									<Icon name="calendar alternate" />
									{new AgeFromDateString(item.fecha_nacimiento).age} años
								</Label>
							</Item.Extra>
						</Item.Content>
					</Item>
				);
			})}
		</Item.Group>
	);
};

NNATable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default NNATable;
