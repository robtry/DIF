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
				return (
					<React.Fragment key={option.id}>
					<div className="ui checkbox">
						<input
							type="checkbox"
							name={props.label}
							value={option.id}
							id={option.id}
							//ref={register}
							disabled={props.isReview}
						/>
						<label htmlFor={option.id}>{option.label}</label>
					</div>
						<br/>
						</React.Fragment>
				);
			})}
			{/* {errors.vehicles && <div className="form_error">Number of Vehicles is required</div>} */}
		</React.Fragment>
	);
};

MultiValue.propTypes = {
	label: PropTypes.string.isRequired,
	hint: PropTypes.string,
	isReview: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	isEditing: PropTypes.bool
};

export default MultiValue;