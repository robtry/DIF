import React from 'react';
import { Form } from 'semantic-ui-react';
//own
import Separator from '../../components/Forms/FormatControls/Separator';
import Open from '../../components/Forms/FormatControls/Open';
import CloseOne from '../../components/Forms/FormatControls/CloseOne';
import MultiValue from '../../components/Forms/FormatControls/MultiValue';
import File from '../../components/Forms/FormatControls/File';
import Consistent from '../../components/Forms/FormatControls/Constant';

const TemplatePreview = () => {

	return (
		<Form>
			{/* Separator type */}
			<Separator title="Separador" />

			{/* Open type */}
			<Open label="char" type="char" hint="pista" isReview />
			<Open label="string" type="string" isReview />
			<Open label="int" type="int" hint="pista" isReview />
			<Open label="float" type="float" hint="pista" isReview />

			{/* Close type */}
			<CloseOne
				label="Solo una opción"
				isReview
				hint="Únicamente se puede seleccionar una opción"
				options={[
					{ label: 'Opción 1', id: 'id1' },
					{ label: 'Opción 2', id: 'id2' },
					{ label: 'Opción 3', id: 'id3' }
				]}
			/>

			{/* Multi */}
			<MultiValue
				label="Solo una opción"
				//isReview
				hint="Únicamente se puede seleccionar una opción"
				options={[
					{ label: 'Opción 1', id: 'id12' },
					{ label: 'Opción 2', id: 'id22' },
					{ label: 'Opción 3', id: 'id32' }
				]}
				isReview
			/>

			{/* Separator type */}
			<Separator title="Separador" />

			{/* Consistent type */}
			<Consistent
				label='Nombre'
				value='Valor'
			/>

			{/* File */}
			<File
				label='Acta de naciemiento'
				isReview
			/>
		</Form>
	);
};

export default TemplatePreview;
