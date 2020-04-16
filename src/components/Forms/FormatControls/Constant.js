import React from 'react';
import PropTypes from 'prop-types';

const Constanr = (props) => {
	return (
		<p>
			<b>{props.label}:</b> {props.file ? <a href={props.file}> Descargar </a> : props.value}
		</p>
	);
};

Constanr.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	file: PropTypes.string
};

export default Constanr;
