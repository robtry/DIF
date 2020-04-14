import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button, Label } from 'semantic-ui-react';
//own
import NameField from './_shared/NameField';

const NNAForm = (props) => {
	// Forms Validation
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		if (props.isEditing) {
			console.log('[TemplateInitForm.js] editing template', props.id, data);
		} else {
			console.log('[TemplateInitForm.js] creating', data);
		}
		props.refresh();
		props.handleClose();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<Form.Group widths="equal">
				<NameField name="nombre" tag="Nombre de Plantilla" errors={errors} register={register} />
				<Form.Field required>
					<label> Tipo </label>
					{errors.tipo &&
					errors.tipo.type === 'required' && (
						<Label basic color="red" pointing="below">
							Se debe selccionar un tipo de plantilla
						</Label>
					)}
					<select
						name="tipo"
						ref={register({ required: true })}
						//defaultValue={ (props.isEditing && mesa) && mesa.id_eleccion ? mesa.id_eleccion : null }
					>
						<option value="">--seleccione--</option>
						<option value="medico">Médico</option>
						<option value="abogado">Legal</option>
						<option value="tsocial">Trabajo Social</option>
						<option value="psicologo">Psicólogico</option>
					</select>
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
	id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	/** Para saber si se debe hacer un request para obtener info */
	isEditing: PropTypes.bool,
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired
};

export default NNAForm;
