import React, { useState } from 'react';
import { Form, Radio, Popup, Icon, Label } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// own
import Open from './TemplateControls/Open';
import DescriptionField from './TemplateControls/_DescrptionField';
import File from './TemplateControls/File';
import Consistent from './TemplateControls/Consistent';
import CloseMulti from './TemplateControls/CloseMulti';
import axios from '../../util/axios';

const TemplateControlsForm = (props) => {
	//console.log('Template controls form ', props);

	// radio btn
	const [ radioValue, setRadioValue ] = useState(props.item ? props.item.tipo : 'abierta');
	const handleChangeRadioBtn = (_, { value }) => {
		setRadioValue(value);
		reset();
	};

	//form
	const { register, handleSubmit, errors, reset } = useForm();
	const onSubmitHandler = (data) => {
		//console.log(props.postPath)
		//console.log('TemplateContrlosForm', { ...data, tipo: radioValue, index: +data.index });
		//return
		axios
			.post(props.postPath, { ...data, tipo: radioValue, index: +data.index })
			.then(() => {
				props.refresh();
				reset();
			})
			.catch((err) => {
				console.log('Template Controls Form', err);
			});
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			{/* <Message header='Tipo de la pregunta' list={[ 'Abierta: simon' ]} /> */}
			<Form.Group inline>
				<label>
					Tipo de Control:
					<Popup
						wide="very"
						content={
							<ul>
								<li>
									<b>Abierta:</b>El campo puede ser llenado libremente por el algún usuario
								</li>
								<li>
									<b>Cerrada:</b>El campo es de opción múltiple con una sóla opción posible
								</li>
								<li>
									<b>Multivalor:</b>El campo es de opción múltiple con varias opciones válidas
								</li>
								<li>
									<b>Consistente:</b>El campo se recupera directamente de la infomación disponible del
									NNA
								</li>
								<li>
									<b>Archivo:</b>El campo será llenado con un archivo
								</li>
								<li>
									<b>Separador:</b>Útil para distinguir secciones
								</li>
							</ul>
						}
						trigger={<Icon circular name="question circle" />}
					/>
				</label>
				<Form.Field
					control={Radio}
					label="Abierta"
					value="abierta"
					checked={radioValue === 'abierta'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Cerrada"
					value="cerrada"
					checked={radioValue === 'cerrada'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Multivalor"
					value="multi"
					checked={radioValue === 'multi'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Constante"
					value="constante"
					checked={radioValue === 'constante'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Archivo"
					value="archivo"
					checked={radioValue === 'archivo'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Separador"
					value="separador"
					checked={radioValue === 'separador'}
					onChange={handleChangeRadioBtn}
				/>
			</Form.Group>

			{/* {radioValue === 'separador' && <Separator register={register} errors={errors} />} */}

			<Form.Group widths="equal">
				{/*radioValue !== 'separador'*/ true && (
					<React.Fragment>
						<Form.Field required>
							<label>Nombre del Campo</label>
							{errors.nombre &&
							errors.nombre.type === 'required' && (
								<Label basic color="red" pointing="below">
									Ingrese el nombre del campo
								</Label>
							)}
							{errors.nombre &&
							errors.nombre.type === 'pattern' && (
								<Label basic color="red" pointing="below">
									El nombre no puede iniciar con espacio
								</Label>
							)}
							<input
								type="text"
								name="nombre"
								ref={register({ required: true, pattern: /^[^-\s].*/ })}
								defaultValue={props.item ? props.item.nombre : ''}
							/>
						</Form.Field>
						{radioValue === 'abierta' && (
							<Open
								register={register}
								errors={errors}
								defaultCampo={props.item && props.item.tipo === 'abierta' ? props.item.tipo_campo : ''}
								defaultPlaceHolder={
									props.item && props.item.tipo === 'abierta' ? props.item.placeholder : ''
								}
							/>
						)}
						{radioValue === 'archivo' && (
							<File
								register={register}
								errors={errors}
								default={props.item && props.item.tipo === 'archivo' ? props.item.tipo_archivo : ''}
							/>
						)}
						{radioValue === 'constante' && (
							<Consistent
								register={register}
								errors={errors}
								default={props.item && props.item.tipo === 'constante' ? props.item.fuente : ''}
							/>
						)}
					</React.Fragment>
				)}
			</Form.Group>

			{(radioValue === 'cerrada' || radioValue === 'multi') && (
				<CloseMulti
					register={register}
					errors={errors}
					default={
						props.item && (props.item.tipo === 'cerrada' || props.item.tipo === 'multi') ? (
							props.item.opciones.map(op => op.valor).join('\n')
						) : (
							''
						)
					}
				/>
			)}

			{radioValue !== 'constante' &&
			radioValue !== 'separador' && (
				<DescriptionField
					register={register}
					default={
						props.item && props.item.tipo !== 'constante' && props.item.tipo !== 'separador' ? (
							props.item.pista
						) : (
							''
						)
					}
				/>
			)}

			<Form.Field width="4">
				<label>
					Index
					<Popup content="Para establecer un orden" trigger={<Icon circular name="question circle" />} />
				</label>
				{errors.index &&
				errors.index.type === 'required' && (
					<Label basic color="red" pointing="below">
						Ingrese un index para el campo
					</Label>
				)}
				{errors.index &&
				errors.index.type === 'pattern' && (
					<Label basic color="red" pointing="below">
						Sólo se permiten números
					</Label>
				)}
				<input
					type="number"
					name="index"
					defaultValue={props.item ? props.item.index : 0}
					ref={register({ required: true, pattern: /^-?[0-9]+/ })}
				/>
			</Form.Field>

			<Form.Button primary>{props.item ? 'Actualizar Campo' : 'Agregar Campo'}</Form.Button>
		</Form>
	);
};

TemplateControlsForm.propTypes = {
	/** when editing */
	item: PropTypes.object,
	postPath: PropTypes.string.isRequired,
	refresh: PropTypes.func.isRequired
};

export default TemplateControlsForm;
