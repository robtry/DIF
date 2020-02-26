import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/Formats/FormatTable';
import Copyright from '../../components/Copyright/index';
//hoc
//context
//css

const Formats = (props) => {
	return (
		<React.Fragment>
			<Header size="huge"> Historial de formatos </Header>
			<Copyright />
			<Table />
		</React.Fragment>
	);
}

export default Formats;