import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/Formats/FormatTable';
//hoc
//context
//css

const Formats = (props) => {
	return (
		<React.Fragment>
			<Header size="huge"> Historial de formatos </Header>
			<Table />
		</React.Fragment>
	);
}

export default Formats;