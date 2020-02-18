import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/NNAs/NNATable';
//hoc
//context
//css

const NNAs = (props) => {
	return (
		<React.Fragment>
			<Header size="huge"> NNA's </Header>
			<Table />
		</React.Fragment>
	);
}

export default NNAs;