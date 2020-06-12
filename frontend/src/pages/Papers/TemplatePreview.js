import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Loader, Divider, Button, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useRouteMatch } from 'react-router-dom';
//own
import Separator from '../../components/Forms/FormatControls/Separator';
import Open from '../../components/Forms/FormatControls/Open';
import CloseOne from '../../components/Forms/FormatControls/CloseOne';
import MultiValue from '../../components/Forms/FormatControls/MultiValue';
import File from '../../components/Forms/FormatControls/File';
import Consistent from '../../components/Forms/FormatControls/Constant';
/// axios
import axios from '../../util/axios';
// context
import userContext from '../../context/userContext';

/** Es contruida con todos los campos desabilitados, o habilitados y llenos o vacios
 * El preview de template
 * El edit del format
 */

const TemplatePreview = ({ item, isFormatMode }) => {
	const { register, handleSubmit } = useForm();
	const { currentUser } = useContext(userContext);
	//console.log(item);
	const location = useRouteMatch();
	// when posting
	const [ visible, setVisible ] = useState(false);

	const onSubmitHandler = (data) => {
		const fd = new FormData();
		const dataKeys = Object.keys(data);
		fd.append('id_usuario', currentUser._id);
		for (let i = 0; i < dataKeys.length; i++) {
			//console.log('appending', dataKeys[i], data[dataKeys[i]]);
			if (data[dataKeys[i]] instanceof FileList) {
				//is file
				if (data[dataKeys[i]][0] && data[dataKeys[i]][0].name) {
					//console.log('file');
					fd.append(dataKeys[i], data[dataKeys[i]][0], data[dataKeys[i]][0].name.replace(/\s/g, ''));
				}
			} else if (data[dataKeys[i]] instanceof Array) {
				//console.log('array');
				fd.append(dataKeys[i], JSON.stringify(data[dataKeys[i]]));
			} else {
				//console.log('normal');
				fd.append(dataKeys[i], data[dataKeys[i]]);
			}
		}
		//return;
		axios
			.post('formats/' + location.params.id, fd)
			.then(() => {
				if (isFormatMode) {
					setVisible(true);
				}
			})
			.catch((err) => {
				console.log('err template preview', err);
				setVisible(false);
			});
	};

	return (
		<React.Fragment>
			{item.campos &&
			item.campos.length === 0 && <p>Aún no hay campos en {isFormatMode ? 'este formato' : 'esta plantilla'}</p>}
			<React.Fragment>
				{visible && (
					<Message
						onDismiss={() => {
							setVisible(false);
						}}
						success
						header="Se guardaron los cambios correctamente"
					/>
				)}

				<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
					{item && item.campos ? (
						item.campos.map((c) => {
							if (c.tipo === 'separador') {
								return (
									<React.Fragment key={c._id}>
										<Divider />
										<Separator title={c.nombre} />
										<Divider />
									</React.Fragment>
								);
							}
							if (c.tipo === 'abierta') {
								return (
									<Open
										key={c._id}
										label={c.nombre}
										type={c.tipo_campo}
										hint={c.pista}
										isReview={!isFormatMode}
										placeholder={c.placeholder}
										name={c._id}
										register={register}
										default={isFormatMode ? c.respuesta ? c.respuesta : '' : ''}
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
										name={c._id}
										register={register}
										default={isFormatMode ? c.respuesta ? c.respuesta : '' : ''}
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
										name={c._id}
										register={register}
										default={isFormatMode ? c.respuesta ? c.respuesta : [] : []}
									/>
								);
							}
							if (c.tipo === 'archivo') {
								return (
									// <p key={c._id}>file proximamente</p>
									<React.Fragment key={c._id}>
										<br />
										<File
											label={c.nombre}
											isReview={!isFormatMode}
											name={c._id}
											register={register}
										/>
									</React.Fragment>
								);
							}
							//const
							return <Consistent label={c.nombre} value={!isFormatMode ? '' : item.nna[c.fuente]} key={c._id} />;
						})
					) : (
						<Loader />
					)}

					{isFormatMode && (
						<Button
							color="grey"
							icon="save"
							labelPosition="right"
							content="Guardar"
							type="submit"
							size="large"
						/>
					)}
					<br />
					<br />
				</Form>
			</React.Fragment>
		</React.Fragment>
	);
};

TemplatePreview.propTypes = {
	item: PropTypes.object.isRequired,
	isFormatMode: PropTypes.bool.isRequired
};

export default TemplatePreview;
