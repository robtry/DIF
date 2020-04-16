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
			{props.type === 'char' && <input type="text" disabled={props.isReview} placeholder={props.placeholder}/>}
			{props.type === 'string' && <textarea disabled={props.isReview} placeholder={props.placeholder}/>}
			{props.type === 'int' && <input type="number" disabled={props.isReview} placeholder={props.placeholder}/>}
			{props.type === 'float' && <input type="text" disabled={props.isReview} placeholder={props.placeholder}/>}
			{props.type === 'date' && <input type="date" disabled={props.isReview} placeholder={props.placeholder}/>}
			{props.type === 'datetime' && <input type="datetime-local" disabled={props.isReview} placeholder={props.placeholder}/>}
		</Form.Field>
	);
};

Open.propTypes = {
	label: PropTypes.string.isRequired,
	isEditing: PropTypes.bool,
	type: PropTypes.oneOf([ 'int', 'float', 'char', 'string', 'date', 'datetime' ]).isRequired,
	hint: PropTypes.string,
	isReview: PropTypes.bool,
	placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Open;
