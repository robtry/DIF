import React, { useCallback, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/NNAs/NNATable';
import Copyright from '../../components/Copyright/index';
//hoc
//context
//css

const NNAs = () => {

	const loadData = useCallback(() => {
		console.log('[index nna.js] | Fetching nnas',);
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<React.Fragment>
			<Header size="huge"> NNA's </Header>
			<Copyright />
			<Table data={[]} loadData={loadData}/>
		</React.Fragment>
	);
}

export default NNAs;