import React from 'react';
import { Form } from 'semantic-ui-react';
//own
import Separator from '../../components/Forms/FormatControls/Separator';
import Open from '../../components/Forms/FormatControls/Open';
import CloseOne from '../../components/Forms/FormatControls/CloseOne';
import MultiValue from '../../components/Forms/FormatControls/MultiValue';
import File from '../../components/Forms/FormatControls/File';
import Consistent from '../../components/Forms/FormatControls/Constant';

/** Es contruida con todos los campos desabilitados, o habilitados y llenos o vacios */

const TemplatePreview = (props) => {
	console.log(props);

	return (
		<Form>
			{/* Separator type */}
			<Separator title="Informe Psicológico" />

			{/* Open type */}
			<Open
				label="Fecha"
				type="date"
				hint="Fecha en la que se llena el formato"
				isReview={!props.isFormatMode}
			/>

			{/* Consistent type */}
			<Consistent label="No Expediente" value="[expediente]" />

			{/* Close type */}
			<CloseOne
				label="Metodología"
				isReview={!props.isFormatMode}
				hint="Descripción sobre las técnicas"
				options={[
					{ label: 'Observación', id: 'id1' },
					{ label: 'Entrevista Semietructurada', id: 'id2' },
				]}
			/>

			{/* Multi */}
			<MultiValue
				label="Derechos Vulnerados"
				options={[
					{ label: 'Derecho A', id: 'id12' },
					{ label: 'Derecho B', id: 'id22' },
					{ label: 'Derecho C', id: 'id32' }
				]}
				isReview={!props.isFormatMode}
			/>

			<Open
				label='Observaciones'
				type='string'
				hint='Resaltar la información sobre...'
				placeholder='Durante la sesión'
				isReview={!props.isFormatMode}
			/>

			{/* Separator type */}
			<Separator title="Archivos" />

			{/* File */}
			<File label="Acta de naciemiento" isReview={!props.isFormatMode} />
		</Form>
	);
};

export default TemplatePreview;
