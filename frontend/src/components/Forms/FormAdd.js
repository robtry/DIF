import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
//own
import SearchBar from '../SearchBar/FastSearch';
//import axios from '../../util/axios';

const AddEditSongsForm = ({ item, refresh, toggle }) => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		//console.log({...data, genres: data.genres.split('\n')});
		console.log(data);
		// axios
		// 	.post(!item ? '/songs/' : '/songs/' + item._id + '/', {...data, genres: data.genres.split('\n')})
		// 	.then(() => {
		// 		toggle();
		// 		refresh();
		// 	})
		// 	.catch((err) => console.log(err));
	};

	//console.log(item);
	//console.log(errors);

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<Form.Group>
				<label>Formato: </label>
				<SearchBar
					type="Album"
					name="id_album"
					text={item ? item.album.name : null}
					id={item ? item.album._id : null}
					errors={errors}
					register={register}
				/>
			</Form.Group>
		</Form>
	);
};

AddEditSongsForm.propTypes = {
	toggle: PropTypes.func.isRequired,
	item: PropTypes.object,
	refresh: PropTypes.func.isRequired
};

export default AddEditSongsForm;
