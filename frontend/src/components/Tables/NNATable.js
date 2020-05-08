import React from 'react';
import { Icon, Item, Grid, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AgeFromDateString } from 'age-calculator';
// own
//import Formats from './AccordionFormats/AccordionFormats';
import CrudButton from './_shared/RUD_Button';
import NNAForm from '../Forms/NNAForm';

import defaultImage from '../../assets/defaultNNA.png';

/**
 * Es la tabla que se muestra los NNAs
*/

const NNATable = (props) => {
	return (
		<Item.Group relaxed className="center-item">
			{props.data.map((item) => {
				return (
					<Item key={item._id}>
						<Item.Image size="tiny" src={item.image ? item.image : defaultImage} />
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
										</Grid.Column>
										<Grid.Column width={5} />
										<Grid.Column width={3}>
											<CrudButton
												deletePath={'nnas/' + item._id}
												onDelete={item.nombre}
												onEdit={NNAForm}
												refresh={props.loadData}
												item={item}
											/>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Item.Description>
							<Item.Extra>
								<Label color="blue" size="mini">
									<Icon name="chart bar" />
									12 Formatos
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
