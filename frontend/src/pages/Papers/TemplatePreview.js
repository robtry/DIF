import React from 'react';
import PropTypes from 'prop-types';
import { Form, Loader } from 'semantic-ui-react';
//own
import Separator from '../../components/Forms/FormatControls/Separator';
import Open from '../../components/Forms/FormatControls/Open';
import CloseOne from '../../components/Forms/FormatControls/CloseOne';
import MultiValue from '../../components/Forms/FormatControls/MultiValue';
import File from '../../components/Forms/FormatControls/File';
import Consistent from '../../components/Forms/FormatControls/Constant';

/** Es contruida con todos los campos desabilitados, o habilitados y llenos o vacios */

const TemplatePreview = ({ item, isFormatMode }) => {
	//console.log(item);

	return (
		<Form>
			{item ? (
				item.campos.map((c) => {
					if (c.tipo === 'separador') {
						return <Separator title={c.nombre} key={c._id} />;
					}
					if (c.tipo === 'abierta') {
						return (
							<Open
								key={c._id}
								label={c.nombre}
								type={c.tipo_campo}
								hint={c.pista}
								isReview={!isFormatMode}
							/>
						);
					}
					if (c.tipo === 'cerrada') {
						return (
							<CloseOne
								key={c._id}
								label={c.nombre}
								isReview={!isFormatMode}
								hint={c.pista}
								options={c.opciones}
							/>
						);
					}
					if (c.tipo === 'multi') {
						return (
							<MultiValue
								key={c._id}
								label={c.nombre}
								options={c.opciones}
								isReview={!isFormatMode}
								hint={c.pista}
							/>
						);
					}
					if (c.tipo === 'archivo') {
						return <File key={c._id} label={c.nombre} isReview={!isFormatMode} />;
					}
					//const
					return <Consistent label={c.nombre} value={`[${c.fuente}]`} key={c._id} />;
				})
			) : (
				<Loader />
			)}
		</Form>
	);
};

TemplatePreview.propTypes = {
	item: PropTypes.object.isRequired,
	isFormatMode: PropTypes.bool.isRequired
};

export default TemplatePreview;
