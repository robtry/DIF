import React, { useEffect, useState } from 'react';
import { Container, Header, Checkbox, Message } from 'semantic-ui-react';
//own
import { useFetchDetails } from '../../util/useFetchDetails';
import Loader from '../../components/Loader/MainLoader';
import TemplateControlsForm from '../../components/Forms/TemplateControlsForm';
import TemplateDetails from './TemplateDetails';


/* Aqui es donde se crean las plantillas */

const CUTemplate = (props) => {
	//console.log(props);

	const { isLoading, loadData, data, error } = useFetchDetails('templates/' + props.match.params.id);
	const [ controllsUp, setControlsUp ] = useState(true);

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	const table = isLoading ? <Loader /> : <TemplateDetails data={data[0] ? data[0] : {}} loadData={loadData} />

	return (
		<Container>
		{error ? (
				<Message color="red" header="Algo salió mal" content={error} />
			) : (
				<React.Fragment>
					<Header size="huge">{data[0] ? data[0].nombre : ''}</Header>

					{!controllsUp && (
						<React.Fragment>
							<Header size="huge">Preview</Header>
							{table}
						</React.Fragment>
					)}

					<Header size="large">Controles</Header>
					<Checkbox
						toggle
						label="Controles por encima"
						checked={controllsUp}
						onChange={() => setControlsUp((prev) => !prev)}
					/>

					<TemplateControlsForm postPath={'templates/fields/' + props.match.params.id} refresh={loadData}/>

					{controllsUp && (
						<React.Fragment>
							<Header size="huge">Preview</Header>
							{table}
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</Container>
	);
};

export default CUTemplate;
