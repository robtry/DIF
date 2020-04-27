import React from 'react';
import { Icon, Item, Grid, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// own
//import Formats from './AccordionFormats/AccordionFormats';
import RudButton from './_shared/RUD_Button';
import NNAForm from '../Forms/NNAForm';

import defaultImage from '../../assets/defaultNNA.png';

/**
 * Es la tabla que se muestra los NNAs
*/

const NNATable = (props) => {
	return (
		<Item.Group relaxed className="center-item">
			<Item>
				<Item.Image size="tiny" src={defaultImage} />
				<Item.Content>
					<Item.Header>Stevie Feliciano</Item.Header>
					<Item.Meta>Expediente</Item.Meta>
					<Item.Description>
						<Grid>
							<Grid.Row>
								<Grid.Column width={8}>
									<Button icon basic primary labelPosition="left" as={NavLink} to="/nna/1">
										Perfil
										<Icon name="user circle outline" />
									</Button>
								</Grid.Column>
								<Grid.Column width={5} />
								<Grid.Column width={3}>
									<RudButton id={1} onDelete="John Lilki" onEdit={NNAForm} refresh={props.loadData} />
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
							15 años
						</Label>
					</Item.Extra>
				</Item.Content>
			</Item>
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
