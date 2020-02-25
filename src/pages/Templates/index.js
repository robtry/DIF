import React from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/Templates/TemplateTable';
//hoc
//context
//css

const Templates = (props) => {
	return (
		<React.Fragment>
			<Header size="huge"> Plantillas </Header>
			<Table />
		</React.Fragment>
	);
}

export default Templates;