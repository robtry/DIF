import React from 'react';
import PropTypes from 'prop-types';

const Constanr = (props) => {
	return (
		<p>
			<b>{props.label}:</b> {props.file ? props.value ? <a href={props.file}> Descargar </a> : 'Aun no hay archivo disponible' : props.value}
		</p>
	);
};

Constanr.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
	file: PropTypes.string
};

export default Constanr;
