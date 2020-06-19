import React, { useState } from 'react';
import { Form, Button, FormGroup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//own
import SearchBar from '../SearchBar/FormatSearch';
import axios from '../../util/axios';

const FormatAddForm = ({ refresh, handleClose }) => {
	const { register, handleSubmit, errors } = useForm();
	const location = useRouteMatch();
	const [ isPosting, setIsPosting ] = useState(false);

	const onSubmitHandler = (data) => {
		//console.log({ ...data, id_nna: location.params.id });
		setIsPosting(true);
		axios
			.post('/formats/', { ...data, id_nna: location.params.id })
			.then(() => {
				handleClose();
				refresh();
			})
			.catch((err) => console.log(err));
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<FormGroup widths="equal">
				<SearchBar errors={errors} register={register} />
			</FormGroup>
			<Button
				positive
				loading={isPosting}
				icon="checkmark"
				labelPosition="right"
				content={'Agregar'}
				type="submit"
				floated="right"
			/>
			<br />
			<br />
		</Form>
	);
};

FormatAddForm.propTypes = {
	/** To close the modal */
	handleClose: PropTypes.func.isRequired,
	/** Refresher */
	refresh: PropTypes.func.isRequired
};

export default FormatAddForm;
