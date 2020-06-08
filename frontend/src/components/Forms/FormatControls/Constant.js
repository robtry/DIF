import React from 'react';
import PropTypes from 'prop-types';

const Constanr = (props) => {
	return (
		<p>
			<b>{props.label}:</b>
			{props.file ? props.value ? (
				<a href={props.file} target="_blank">
					Revisar
				</a>
			) : (
				'Aun no hay archivo disponible'
			) : (
				props.value
			)}
		</p>
	);
};

Constanr.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
	file: PropTypes.string
};

export default Constanr;
