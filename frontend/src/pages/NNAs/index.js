import React, { useState } from 'react';
import { Header, Button, Icon, Grid, Popup } from 'semantic-ui-react';
//own
import Table from '../../components/Tables/NNATable';
import Copyright from '../../components/Copyright/index';
import New from '../../components/Modal/_CUModal';
import NNAForm from '../../components/Forms/NNAForm';
import Pagination from '../../components/UI/Pagination';
import PaginationLoader from '../../components/Loader/PaginationLoader';
import Loader from '../../components/Loader/UserLoader';
import IndexSearch from '../../components/SearchBar/IndexSearch';
import { useFetch } from '../../util/useFetch';
import NoRegs from '../../components/UI/NoRegs';

const NNAPage = () => {
	const [ types, setTypes ] = useState('actdesc');
	const { data, isLoading, loadData, totalPages, isLoadingPages, isSearching, searchByName } = useFetch('nnas', types + '/');

	return (
		<React.Fragment>
			<Header size="huge"> NNA's </Header>
			<Copyright />

			<Grid stackable columns={2}>
				<Grid.Row>
					<Grid.Column>
						<New message="Agregar NNA" Form={NNAForm} refresh={loadData} />
					</Grid.Column>
					<Grid.Column>
						{isLoadingPages ? <PaginationLoader /> : !isSearching && totalPages > 1 && <Pagination totalPages={totalPages} />}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column>
						{!isSearching && <Button.Group>
							<Popup
								content="Ordenar alfabéticamente de forma descendente"
								trigger={
									<Button icon onClick={() => setTypes('namedesc')} active={types === 'namedesc'}>
										<Icon name="sort alphabet down" />
									</Button>
								}
							/>

							<Popup
								content="Ordenar alfabéticamente de forma ascendente"
								trigger={
									<Button icon onClick={() => setTypes('nameasc')} active={types === 'nameasc'}>
										<Icon name="sort alphabet up" />
									</Button>
								}
							/>

							<Popup
								content="Ordenar por actividad reciente"
								trigger={
									<Button icon onClick={() => setTypes('actdesc')} active={types === 'actdesc'}>
										<Icon name="sort amount down" />
									</Button>
								}
							/>

							<Popup
								content="Ordenar por menos activo"
								trigger={
									<Button icon onClick={() => setTypes('actasc')} active={types === 'actasc'}>
										<Icon name="sort amount up" />
									</Button>
								}
							/>

							<Popup
								content="Ordenar recien agregados"
								trigger={
									<Button icon onClick={() => setTypes('adddesc')} active={types === 'adddesc'}>
										<Icon name="sort up" />
									</Button>
								}
							/>

							<Popup
								content="Ordenar por actividad reciente"
								trigger={
									<Button icon onClick={() => setTypes('addasc')} active={types === 'addasc'}>
										<Icon name="sort down" />
									</Button>
								}
							/>
						</Button.Group>}
					</Grid.Column>
					<Grid.Column>
						<IndexSearch searcher={searchByName} type="nnas" reloader={loadData} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row />
			</Grid>

			{isLoading ? <Loader /> : data.length === 0 ? <NoRegs /> : <Table data={data} loadData={loadData} />}
		</React.Fragment>
	);
};

export default NNAPage;
