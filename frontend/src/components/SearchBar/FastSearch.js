import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search, Grid, Label, Form, Input } from 'semantic-ui-react';
//own
import { useFetch } from '../../util/useFetch';

// tag
const resultRenderer = ({ title }) => <Label content={title} />;
resultRenderer.propTypes = {
	title: PropTypes.string
};

/** Esta es la bar que es utilizada en los forms */

const FastSearch = (props) => {
	const { isLoading, data, searchByName, loadData } = useFetch(false);

	//current search
	const [ valueCool, setValue ] = useState('');
	const [ finalCool, setFinalCool ] = useState({
		name: props.text,
		id: props.id
	});
	//console.log(finalCool);

	//para el searcher
	const [ results, setResults ] = useState([]);

	const handleResultSelect = (_, { result }) => {
		setValue(result.title);
		setFinalCool({
			name: result.title,
			id: result.id
		});
	};

	const handleSearchChange = (_, { value }) => {
		setValue(value);
		if (value.length < 1) {
			loadData();
		} else {
			switch (props.type) {
				case 'Artist':
					searchByName('/artist/' + value);
					break;
				case 'Album':
					searchByName('/album/' + value);
					break;
				case 'Song':
					searchByName('/song/' + value);
					break;
				case 'Company':
					searchByName('/company/' + value);
					break;
				default:
					console.log('Algo anda mal');
					break;
			}
		}
	};

	useEffect(
		() => {
			setResults(
				data.map((item) => {
					return {
						id: item._id,
						title: item.name
					};
				})
			);
		},
		[ data ]
	);

	return (
		<Grid>
			<Grid.Column width={6}>
				<Search
					loading={isLoading}
					onResultSelect={handleResultSelect}
					onSearchChange={handleSearchChange}
					results={results}
					value={valueCool}
					resultRenderer={resultRenderer}
					noResultsMessage={'No se encontraron coincidencias'}
				/>
			</Grid.Column>
			<Grid.Column width={2} />
			<Grid.Column width={6}>
				<Form.Group>
					<Input
						type="text"
						placeholder="<-- Buscar"
						readOnly
						//disabled
						value={finalCool.name ? finalCool.name : ''}
						invalid={props.errors[props.name] && true}
					/>
					{props.errors[props.name] && (
						'Aún no ha seleccionado nada'
					)}
					<input
						type="hidden"
						readOnly
						disabled
						name={props.name}
						ref={props.register({
							required: true
						})}
						value={finalCool.id ? finalCool.id : ''}
					/>
				</Form.Group>
			</Grid.Column>
		</Grid>
	);
};

FastSearch.propTypes = {
	type: PropTypes.oneOf([ 'Album', 'Song', 'Company', 'Artist' ]).isRequired,
	// para cuando editing
	text: PropTypes.string,
	id: PropTypes.string,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	/** Referencia a useForm */
	errors: PropTypes.object.isRequired,
	/** Referencia a useForm */
	name: PropTypes.string.isRequired
};

export default FastSearch;
