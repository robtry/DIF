import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const File = (props) => {
	const filerFilesHandler = (filetype) => {
		switch(filetype){
			case "imagen":
				return 'image/*'
			case "pdf":
				return '.pdf'
			case "docx":
				return '.doc,.docx,.odf'
			case "xlsx":
				return '.xls,.xslx,.ods'
			case "zip":
				return '.zip,.rar,.tar'
			default:
				return '*'
		}
	}

	return (
		<Form.Field>
			<label>
				{props.label}
				{props.hint && <Popup content={props.hint} trigger={<Icon circular name="question circle" />} />}
			</label>
			<input type="file" accept={filerFilesHandler(props.accept)} disabled={props.isReview} name={props.name} ref={props.register()} />
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
