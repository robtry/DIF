import React, { useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
//own
import { useFetchDetails } from '../../util/useFetchDetails';
import Loader from '../../components/Loader/MainLoader';
import TemplatePreview from './TemplatePreview';

/** Este es como el template preview, pero con los campos habilitados */

const RUFormat = () => {
	const location = useRouteMatch();

	const { isLoading, data, loadData } = useFetchDetails('/formats/' + location.params.id);
	//console.log( data);

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	return isLoading ? (
		<Loader />
	) : (
		<Container text>
			<Header>{data[0] ? data[0]._id.plantilla.nombre : ''} | {data[0] ? data[0].nna.nombre_completo : ''}</Header>
			{isLoading ? <Loader /> : <TemplatePreview item={data[0] ? data[0] : {}} isFormatMode={true} />}
		</Container>
	);
};

export default RUFormat;
