import React, { useState } from 'react';
import { Header, Grid } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/Papers/FormatTable';
import Pagination from '../../components/UI/Pagination';
import Loader from '../../components/Loader/MainLoader';
import { useFetch } from '../../util/useFetch';
import IndexSearch from '../../components/SearchBar/IndexSearch';
import NoRegs from '../../components/UI/NoRegs';
import PaginationLoader from '../../components/Loader/PaginationLoader';
import UserTypes from '../../components/UI/UserTypes';

import FormatAddForm from '../../components/Forms/FormAdd';
import New from '../../components/Modal/_CUModal';

const Formats = (props) => {
	// type of current table
	const [ types, setTypes ] = useState('all');

	const { data, isLoading, loadData, totalPages, isLoadingPages, isSearching, searchByName } = useFetch(
		'formats',
		types + '/' + props.idNNA + '/'
	);

	return (
		<React.Fragment>
			<Header size="huge"> Formatos </Header>

			<Grid stackable columns={2}>
				<Grid.Row>
					<Grid.Column>
						<New message="Agregar formato" Form={FormatAddForm} refresh={loadData} />
					</Grid.Column>
					<Grid.Column>
						{isLoadingPages ? (
							<PaginationLoader />
						) : (
							!isSearching && totalPages > 1 && <Pagination totalPages={totalPages} />
						)}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column>
						<IndexSearch
							extraID={props.idNNA}
							searcher={searchByName}
							type="formats"
							reloader={loadData}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row />
			</Grid>

			<UserTypes setTypes={setTypes} type={types} />

			<div style={{ marginTop: '30px' }} />

			{isLoading ? <Loader /> : data.length === 0 ? <NoRegs /> : <Table data={data} loadData={loadData} nna={props.nna}/>}

			<div style={{ marginBottom: '150px' }} />
		</React.Fragment>
	);
};

export default Formats;
