import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Loader, Divider, Button, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useRouteMatch } from 'react-router-dom';
//own
import Separator from '../../components/Forms/FormatControls/Separator';
import Open from '../../components/Forms/FormatControls/Open';
import CloseOne from '../../components/Forms/FormatControls/CloseOne';
import MultiValue from '../../components/Forms/FormatControls/MultiValue';
//import File from '../../components/Forms/FormatControls/File';
import Consistent from '../../components/Forms/FormatControls/Constant';
/// axios
import axios from '../../util/axios';

/** Es contruida con todos los campos desabilitados, o habilitados y llenos o vacios */

const TemplatePreview = ({ item, isFormatMode }) => {
	const { register, handleSubmit } = useForm();
	//console.log(item);
	const location = useRouteMatch();
	const [ visible, setVisible ] = useState(false);

	const onSubmitHandler = (data) => {
		console.log(data);
		axios
			.post('formats/' + location.params.id, data)
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
			{visible && <Message onDismiss={() => {setVisible(false)}} success header="Se guardaron los cambios correctamente" />}

			<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
				{item && item.campos ? (
					item.campos.map((c) => {
						let x = item.respuestas.find((r) => {
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
									default={x ? x.respuesta : ''}
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
								/>
							);
						}
						if (c.tipo === 'archivo') {
							return (
								<p key={c._id}>file proximamente</p>
								// <File
								// 	key={c._id}
								// 	label={c.nombre}
								// 	isReview={!isFormatMode}
								// 	name={c._id}
								// 	register={register}
								// />
							);
						}
						//const
						return <Consistent label={c.nombre} value={`[${c.fuente}]`} key={c._id} />;
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
	);
};

TemplatePreview.propTypes = {
	item: PropTypes.object.isRequired,
	isFormatMode: PropTypes.bool.isRequired
};

export default TemplatePreview;
