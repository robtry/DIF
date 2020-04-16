import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// https://stackoverflow.com/questions/59674845/how-do-i-store-the-state-of-radio-groups-in-react-using-react-hook-form

const CloseOne = (props) => {
	return (
		<React.Fragment>
			<Form.Field>
				<label>
					{props.label}
					{props.hint && <Popup content={props.hint} trigger={<Icon circular name="question circle" />} />}
				</label>
			</Form.Field>

			{props.options.map((option) => {
				//console.log(option);
				return (
					<div className="field" key={option.id}>
						<div className="ui radio checkbox">
							<input
								type="radio"
								name={props.label}
								id={option.id}
								value={option.id}
								//ref={register({ required: true })}
								disabled={props.isReview}
							/>
							<label htmlFor={option.id}>{option.label}</label>
						</div>
					</div>
				);
			})}
			{/* {errors.vehicles && <div className="form_error">Number of Vehicles is required</div>} */}
		</React.Fragment>
	);
};

CloseOne.propTypes = {
	label: PropTypes.string.isRequired,
	hint: PropTypes.string,
	isReview: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	isEditing: PropTypes.bool
};

export default CloseOne;
