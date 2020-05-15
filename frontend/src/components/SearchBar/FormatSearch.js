import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search, Label, Input, FormField } from 'semantic-ui-react';
//own
import { useFetch } from '../../util/useFetch';

// tag
const resultRenderer = ({ title }) => <Label content={title} />;
resultRenderer.propTypes = {
	title: PropTypes.string
};

/** Esta es la barra que es utilizada en los forms */

const FastSearch = (props) => {
	const { isLoading, data, searchByName, loadData } = useFetch('templates', 'all/');

	//current search
	const [ valueCool, setValue ] = useState('');
	const [ finalCool, setFinalCool ] = useState({
		name: '',
		id: '',
		tipo: ''
	});
	//console.log(finalCool);

	//para el searcher
	const [ results, setResults ] = useState([]);

	const handleResultSelect = (_, { result }) => {
		setValue(result.title);
		setFinalCool({
			name: result.title,
			id: result.id
			//tipo: result.tipo
		});
	};

	const handleSearchChange = (_, { value }) => {
		setValue(value);
		if (value.length < 1) {
			loadData();
		} else {
			searchByName('templates/search/' + value);
		}
	};

	useEffect(
		() => {
			setResults(
				data.map((item) => {
					return {
						id: item._id,
						title: item.nombre
						//tipo: item.tipo
					};
				})
			);
		},
		[ data ]
	);

	return (
		<React.Fragment>
			<FormField>
				<Search
					loading={isLoading}
					onResultSelect={handleResultSelect}
					onSearchChange={handleSearchChange}
					results={results}
					value={valueCool}
					resultRenderer={resultRenderer}
					noResultsMessage={'No se encontraron coincidencias'}
					placeholder="Buscar formato"
				/>
			</FormField>
			<FormField>
				<Input
					type="text"
					placeholder="<-- Buscar"
					readOnly
					//disabled
					value={finalCool.name ? finalCool.name : ''}
					invalid={props.errors.id_plantilla && true}
				/>
				{props.errors.id_plantilla && 'Aún no ha seleccionado nada'}
			</FormField>
			<input
				type="hidden"
				readOnly
				disabled
				name="id_plantilla"
				ref={props.register({
					required: true
				})}
				value={finalCool.id ? finalCool.id : ''}
			/>
		</React.Fragment>
	);
};

FastSearch.propTypes = {
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired
};

export default FastSearch;
