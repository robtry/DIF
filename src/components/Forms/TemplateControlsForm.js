import React, { useState } from 'react';
import { Form, Radio, Popup, Icon } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// own
import Open from './TemplateControls/Open';
import DescriptionField from './TemplateControls/_DescrptionField';
import Separator from './TemplateControls/Separator';
import File from './TemplateControls/File';
import Consistent from './TemplateControls/Consistent';
import CloseMulti from './TemplateControls/CloseMulti';

const TemplateControlsForm = (props) => {
	// radio btn
	const [ radioValue, setRadioValue ] = useState('open');
	const handleChangeRadioBtn = (_, { value }) => {
		setRadioValue(value);
		reset();
	};

	//form
	const { register, handleSubmit, errors, reset } = useForm();
	const onSubmitHandler = (data) => {
		console.log(radioValue);
		console.log(data);
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
					value="open"
					checked={radioValue === 'open'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Cerrada"
					value="close"
					checked={radioValue === 'close'}
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
					label="Consistente"
					value="consistent"
					checked={radioValue === 'consistent'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Archivo"
					value="file"
					checked={radioValue === 'file'}
					onChange={handleChangeRadioBtn}
				/>
				<Form.Field
					control={Radio}
					label="Separador"
					value="separator"
					checked={radioValue === 'separator'}
					onChange={handleChangeRadioBtn}
				/>
			</Form.Group>

			{radioValue === 'separator' && <Separator register={register} errors={errors} />}

			<Form.Group widths="equal">
				{radioValue === 'open' && <Open register={register} errors={errors} />}
				{radioValue === 'file' && <File register={register} errors={errors} />}
				{radioValue === 'consistent' && <Consistent register={register} errors={errors} />}
			</Form.Group>

			{(radioValue === 'close' || radioValue === 'multi') && <CloseMulti register={register} errors={errors} />}

			<DescriptionField />

			<Form.Button primary>Agregar Campo</Form.Button>
		</Form>
	);
};

TemplateControlsForm.propTypes = {
	isEditing: PropTypes.bool
};

export default TemplateControlsForm;
