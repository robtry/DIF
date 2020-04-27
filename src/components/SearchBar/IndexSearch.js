import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const IndexSearch = (props) => {
	const searchByName = (e) => {
		const value = e.target.value;
		if (value.length === 0) {
			props.reloader();
		} else {
			props.searcher(`/${props.type}/` + value);
		}
	};

	return (
		<Input fluid icon={<Icon name="search" inverted circular link />} placeholder="Buscar..." onChange={searchByName} />
	);
};

IndexSearch.propTypes = {
	searcher: PropTypes.func.isRequired,
	type: PropTypes.oneOf([ 'user', 'nna', 'template' ]).isRequired,
	reloader: PropTypes.func.isRequired
};

export default IndexSearch;
