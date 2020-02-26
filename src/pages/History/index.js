import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/History/HistoryTable';
import Copyright from '../../components/Copyright/index';
//hoc
//context
//css

const History = (props) => {
	return (
		<React.Fragment>
			<Header size="huge"> Historial de |nombre| </Header>
			<Copyright />
			<Table />
		</React.Fragment>
	);
}

export default History;