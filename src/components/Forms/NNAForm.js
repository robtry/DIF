import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { Form, Button, Message/* Dimmer, Loader */ } from 'semantic-ui-react';
//own
import NameField from './_shared/NameField';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const NNAForm = props => {
	// Forms Validation
	const { register, handleSubmit, errors } = useForm();
	const [bornDate, setbornDate] = useState();
	const [isValidDate, setIsValidDate] = useState(true);

	const onSubmitHandler = data => {
		if (!bornDate) {
			setIsValidDate(false);
			return;
		}
		if (props.isEditing) {
			console.log('[NNAForm.js] editing user', props.id, data, bornDate);
		} else {
			console.log('[NNAForm.js] creating', data, bornDate);
		}
		props.refresh();
		props.handleClose();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">

			<Form.Group widths="equal">
				<NameField
					name='nombre'
					tag='Nombre'
					errors={errors}
					register={register}
				/>
				<NameField
					name='app'
					tag='Apellido Paterno'
					errors={errors}
					register={register}
				/>
				<NameField
					name='apm'
					tag='Apellido Materno'
					errors={errors}
					register={register}
				/>
			</Form.Group>

			<Form.Group widths="equal">
				<Form.Field required>
					<label> Expediente </label>
					<input
						type='text'
						name='exp'
						ref={register({ required: true })}
					//defaultValue={}
					/>
					{errors.exp && errors.exp.type === 'required' && (
						<Message negative>
							<Message.Header>Para agregar un NNA se requiere un expediente</Message.Header>
						</Message>
					)}
				</Form.Field>

				<Form.Field required>
					<label> Fecha de nacimiento </label>
					<DatePicker
						selected={bornDate}
						onChange={date => {setbornDate(date); setIsValidDate(date && true)}}
						peekNextMonth
						showMonthDropdown
						showYearDropdown
						dropdownMode='scroll'
						maxDate={new Date()}
						locale='es'
						placeholderText='Fecha de Nacimiento'
					/>
					{!isValidDate && (
						<Message negative>
							<Message.Header>Seleccione una fecha de naciemiento</Message.Header>
						</Message>
					)}
				</Form.Field>
			</Form.Group>

			<Form.Group>
				<Form.Field required>
					<label> Sexo </label>
					<select
						name='sexo'
						ref={register({ required: true })}
						//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
					>
						<option value=''>--seleccione--</option>
						<option value='f'>Femenino</option>
						<option value='m'>Masculino</option>
					</select>
					{errors.sexo && errors.sexo.type === 'required' && (
						<Message negative>
							<Message.Header>
								Se debe selccionar un sexo
							</Message.Header>
						</Message>
					)}
				</Form.Field>
				<Form.Field>
					<label> Peso </label>
					<input
						name='peso'
						type='text'
						ref={register({ pattern: /^\d{1,6}(\.\d{1,2})?$/ })}
						placeholder='Kg'
					/>
					{errors.peso && errors.peso.type === 'pattern' && (
						<Message negative>
							<Message.Header>
								Sólo se permiten números con dos decimales ej: 39.5
							</Message.Header>
						</Message>
					)}
				</Form.Field>

				<Form.Field>
					<label> Talla </label>
					<input
						name='talla'
						type='text'
						ref={register({ pattern: /^\d{1,6}(\.\d{1,2})?$/ })}
						placeholder='mts'
					/>
					{errors.talla && errors.talla.type === 'pattern' && (
						<Message negative>
							<Message.Header>
								Sólo se permiten números con dos decimales ej: 1.65
							</Message.Header>
						</Message>
					)}
				</Form.Field>
			</Form.Group>

			<Button
				positive
				icon="checkmark"
				labelPosition="right"
				content={props.isEditing ? 'Actualizar' : 'Agregar'}
				type="submit"
				floated="right"
			/>
			<br />
			<br />
		</Form>
	);
};

NNAForm.propTypes = {
	/** id for get details */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired
};

export default NNAForm;
