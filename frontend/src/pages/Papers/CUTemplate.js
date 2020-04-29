import React, { useEffect, useState } from 'react';
import { Container, Header, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import { useFetchDetails } from '../../util/useFetchDetails';
import Loader from '../../components/Loader/MainLoader';
import TemplateControlsForm from '../../components/Forms/TemplateControlsForm';
import TemplateDetails from './TemplateDetails';

const CUTemplate = (props) => {
	const { isLoading, loadData, data } = useFetchDetails();
	const [ controllsUp, setControlsUp ] = useState(true);

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	return (
		<Container>
			{isLoading ? (
				<Loader />
			) : (
				<React.Fragment>
					<Header size="huge">Nombre de plantilla</Header>

					{!controllsUp && 
					<React.Fragment>
						<Header size="huge">Preview</Header>
						<TemplateDetails data={data} loadData={loadData}/>
					</React.Fragment>}

					<Header size="large">Controles</Header>
					<Checkbox
						toggle
						label="Controles por encima"
						checked={controllsUp}
						onChange={() => setControlsUp((prev) => !prev)}
					/>

					<TemplateControlsForm />

					{controllsUp && 
					<React.Fragment>
						<Header size="huge">Preview</Header>
						<TemplateDetails data={data} loadData={loadData}/>
					</React.Fragment>}
				</React.Fragment>
			)}
		</Container>
	);
};

CUTemplate.propTypes = {
	nombre: PropTypes.string //.isRequired,
};

export default CUTemplate;
