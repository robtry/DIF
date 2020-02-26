import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/NNAs/NNATable';
import Copyright from '../../components/Copyright/index';
//hoc
//context
//css

const NNAs = (props) => {
	return (
		<React.Fragment>
			<Header size="huge"> NNA's </Header>
			<Copyright />
			<Table />
		</React.Fragment>
	);
}

export default NNAs;