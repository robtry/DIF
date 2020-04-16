import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
//own
import { useFetchDetails } from '../../util/useFetchDetails';
import Loader from '../../components/Loader';
import Separator from '../../components/Forms/FormatControls/Separator';
import Open from '../../components/Forms/FormatControls/Open';
import CloseOne from '../../components/Forms/FormatControls/CloseOne';
import MultiValue from '../../components/Forms/FormatControls/MultiValue';
import File from '../../components/Forms/FormatControls/File';
import Consistent from '../../components/Forms/FormatControls/Constant';

/** Este es como el template preview, pero con los campos habilitados */

const RUFormat = () => {
	const { isLoading, /*data,*/ loadData } = useFetchDetails();

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	return isLoading ? (
		<Loader />
	) : (
		<Container>
			<Separator title="Introducción" />
		</Container>
	);
};

export default RUFormat;
