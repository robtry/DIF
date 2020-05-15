import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const File = (props) => {
	return (
		<Form.Field>
			<label>
				{props.label}
				{props.hint && <Popup content={props.hint} trigger={<Icon circular name="question circle" />} />}
			</label>
			<input type="file" disabled={props.isReview} name={props.name} ref={props.register()} />
		</Form.Field>
	);
};

File.propTypes = {
	label: PropTypes.string.isRequired,
	isEditing: PropTypes.bool,
	hint: PropTypes.string,
	isReview: PropTypes.bool,
	// id
	name: PropTypes.string.isRequired,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired
};

export default File;
