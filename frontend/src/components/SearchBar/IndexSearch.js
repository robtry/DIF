import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const IndexSearch = (props) => {
	const searchByName = (e) => {
		const value = e.target.value;
		if (value.length === 0) {
			props.reloader();
		} else {
			props.searcher(`${props.type}/search/` + value + (props.type === 'formats' ? '/' + props.extraID : ''));
		}
	};

	return (
		<Input
			fluid
			icon={<Icon name="search" inverted circular link />}
			placeholder="Buscar..."
			onChange={searchByName}
		/>
	);
};

IndexSearch.propTypes = {
	searcher: PropTypes.func.isRequired,
	type: PropTypes.oneOf([ 'users', 'nnas', 'templates', 'formats' ]).isRequired,
	/** for formats */
	extraID: PropTypes.string,
	reloader: PropTypes.func.isRequired
};

export default IndexSearch;
