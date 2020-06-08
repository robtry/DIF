import React from 'react';
import { Loader, Divider } from 'semantic-ui-react';
//own
import Constant from '../../components/Forms/FormatControls/Constant';
import Separator from '../../components/Forms/FormatControls/Separator';

const fileServer = process.env.REACT_APP_SERVER;

/** Es contruida con todos los campos desabilitados */

const FormatPreview = (props) => {
	//console.log(props.item);
	//console.log('format preview', props.nna)

	return (
		<React.Fragment>
			{props.item && props.item.campos ? (
				props.item.campos.map((c) => {
					//console.log(c.nombre, typeof c.respuesta);

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
								file={fileServer + c.respuesta}
								value={typeof c.respuesta !== 'object'}
								key={c._id}
							/>
						);
					}
					if (c.tipo === 'constante') {
						return <Constant label={c.nombre} value={props.nna[c.fuente]} key={c._id} />;
					}
					if (c.tipo === 'cerrada') {
						if (c.respuesta) {
							const option = c.opciones.find((v) => v._id === c.respuesta);
							//console.log(option)
							return <Constant label={c.nombre} value={option ? option.valor : ''} key={c._id} />;
						}
						return <Constant label={c.nombre} value="" key={c._id} />;
					}
					if (c.tipo === 'multi') {
						if (c.respuesta) {
							let options = [],
								option;
							for (let i = 0; i < c.respuesta.length; i++) {
								option = c.opciones.find((v) => v._id === c.respuesta[i]);
								if (option) {
									options.push(option.valor);
								}
							}
							//console.log(option)
							return <Constant label={c.nombre} value={options.join(',')} key={c._id} />;
						}
						return <Constant label={c.nombre} value="" key={c._id} />;
					}

					//const
					return <Constant label={c.nombre} value={c.respuesta ? c.respuesta : ''} key={c._id} />;
				})
			) : (
				<Loader />
			)}
		</React.Fragment>
	);
};

export default FormatPreview;
