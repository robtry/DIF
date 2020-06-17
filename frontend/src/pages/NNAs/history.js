import React, { useEffect, useState } from 'react';
import { Item, Container, Message } from 'semantic-ui-react';
//own
import Copyright from '../../components/Copyright/index';
import Loader from '../../components/Loader/MainLoader';
import { useFetchDetails } from '../../util/useFetchDetails';
import FormatPage from '../Papers/FormatIndex';
import defaultImage from '../../assets/defaultNNA.png';
import NNADetails from '../../components/Details/NNADetails';

const fileServer = process.env.REACT_APP_SERVER;

/**
 * Child details
*/

const History = (props) => {
	const { isLoading, loadData, data, error } = useFetchDetails('nnas/' + props.match.params.id);

	const [ item, setItem ] = useState({});

	useEffect(
		() => {
			setItem(data[0]);
		},
		[ data ]
	);

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	return (
		<Container textAlign="center">
			<Copyright />
			{error ? (
				<Message color="red" header="Algo salió mal" content={error} />
			) : isLoading ? (
				<Loader />
			) : (
				<React.Fragment>
					<Item.Group className="center-item">
						<br/>
						<br/>
						<Item>
							<Item.Image size="small" src={item && item.image ? fileServer + item.image : defaultImage} />
							<Item.Content verticalAlign="middle">
								<Item.Header>{`${item ? item.nombre : ''} ${item ? item.app : ''} ${item
									? item.apm
									: ''}`}</Item.Header>
							</Item.Content>
						</Item>
					</Item.Group>
					<NNADetails item={item ? item : {}} />
					<FormatPage idNNA={props.match.params.id} nna={item}/>
				</React.Fragment>
			)}
		</Container>
	);
};

export default History;
