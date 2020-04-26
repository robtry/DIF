import React, { useEffect } from 'react';
import { Form, Container, Divider } from 'semantic-ui-react';
//own
import { useFetchDetails } from '../../util/useFetchDetails';
import Loader from '../../components/Loader/MainLoader';
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
		<Container text>
			<Form>
				<Divider />
				{/* Separator type */}
				<Separator title="Juan" />
				<Separator title="Informe Psicológico" />

				<Divider />

				{/* Open type */}
				<Open label="Fecha" type="date" hint="Fecha en la que se llena el formato" />

				<Divider />

				{/* Consistent type */}
				<Consistent label="No Expediente" value="[expediente]" />

				<Divider />

				{/* Close type */}
				<CloseOne
					label="Metodología"
					hint="Descripción sobre las técnicas"
					options={[
						{ label: 'Observación', id: 'id1' },
						{ label: 'Entrevista Semietructurada', id: 'id2' }
					]}
				/>

				<Divider />

				{/* Multi */}
				<MultiValue
					label="Derechos Vulnerados"
					options={[
						{ label: 'Derecho A', id: 'id12' },
						{ label: 'Derecho B', id: 'id22' },
						{ label: 'Derecho C', id: 'id32' }
					]}
				/>

				<Divider />

				<Open
					label="Observaciones"
					type="string"
					hint="Resaltar la información sobre..."
					placeholder="Durante la sesión"
				/>

				<Divider />

				{/* Separator type */}
				<Separator title="Archivos" />

				<Divider />

				{/* File */}
				<File label="Acta de naciemiento" />

				<Divider />
			</Form>
		</Container>
	);
};

export default RUFormat;
