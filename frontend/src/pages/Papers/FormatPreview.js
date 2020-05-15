import React from 'react';
import { Loader, Divider } from 'semantic-ui-react';
//own
import Constant from '../../components/Forms/FormatControls/Constant';
import Separator from '../../components/Forms/FormatControls/Separator';

/** Es contruida con todos los campos desabilitados */

const FormatPreview = (props) => {
	console.log(props.item);

	return (
		<React.Fragment>
			{props.item && props.item.campos ? (
				props.item.campos.map((c) => {
					let x = props.item.respuestas.find((r) => {
						return r.id_campo === c._id;
					});

					if (c.tipo === 'separador') {
						return (
							<React.Fragment key={c._id}>
								<Divider />
								<Separator title={c.nombre} />
								<Divider />
							</React.Fragment>
						);
					}
					if (c.tipo === 'archivo') {
						return (
							<Constant
								label={c.nombre}
								file="path/para/el/file"
								value={x ? x.respuesta : ''}
								key={c._id}
							/>
						);
					}
					//const
					return <Constant label={c.nombre} value={x ? x.respuesta : ''} key={c._id} />;
				})
			) : (
				<Loader />
			)}
		</React.Fragment>
	);
};

export default FormatPreview;
