import React from 'react';
import PropTypes from 'prop-types';

const Constanr = (props) => {
	return (
		<p>
			<b>{props.label}:</b> {props.value}
		</p>
	);
};

Constanr.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	isEditing: PropTypes.bool
};

export default Constanr;
