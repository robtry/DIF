import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MultiValue = (props) => {
	return (
		<React.Fragment>
			<Form.Field>
				<label>
					{props.label}
					{props.hint && <Popup content={props.hint} trigger={<Icon circular name="question circle" />} />}
				</label>
			</Form.Field>

			{props.options.map((option) => {
				let shouldBeChecked;
				if (props.default) {
					shouldBeChecked = props.default.find(o => o === option._id)
				}
				return (
					<React.Fragment key={option._id}>
						<div className="ui checkbox">
							<input
								type="checkbox"
								name={props.name}
								value={option._id}
								id={option._id}
								ref={props.register()}
								disabled={props.isReview}
								defaultChecked={!!shouldBeChecked}
							/>
							<label htmlFor={option._id}>{option.valor}</label>
						</div>
						<br />
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
};

MultiValue.propTypes = {
	label: PropTypes.string.isRequired,
	hint: PropTypes.string,
	isReview: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	isEditing: PropTypes.bool,
	// id
	name: PropTypes.string.isRequired,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	default: PropTypes.array.isRequired
};

export default MultiValue;
