import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// own
import FormatCard from '../../Cards/FormatCard';

/**
 * Es la tabla que se usa para el index de el historial de los formatos
*/

const FormatTable = (props) => (
	<React.Fragment>
		<Card.Group centered>
			{props.data.map((item) => {
				return <FormatCard item={item} key={item._id._id} nna={props.nna} refresh={props.loadData} />;
			})}
		</Card.Group>
	</React.Fragment>
);

FormatTable.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default FormatTable;
