import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Open = (props) => {
	return (
		<Form.Field width={props.type === 'int' || props.type === 'float' ? 4 : 16}>
			<label>
				{props.label}
				{props.hint && <Popup content={props.hint} trigger={<Icon circular name="question circle" />} />}
			</label>
			{props.type === 'char' && <input type="text" disabled={props.isReview} />}
			{props.type === 'string' && <textarea disabled={props.isReview} />}
			{props.type === 'int' && <input type="number" disabled={props.isReview} />}
			{props.type === 'float' && <input type="text" disabled={props.isReview} />}
		</Form.Field>
	);
};

Open.propTypes = {
	label: PropTypes.string.isRequired,
	isEditing: PropTypes.bool,
	type: PropTypes.oneOf([ 'int', 'float', 'char', 'string' ]).isRequired,
	hint: PropTypes.string,
	isReview: PropTypes.bool
};

export default Open;
