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
					<div className="field" key={option._id}>
						<div className="ui radio checkbox">
							<input
								type="radio"
								name={props.name}
								id={option._id}
								value={option._id}
								ref={props.register()}
								disabled={props.isReview}
								defaultChecked={props.default === option._id}
							/>
							<label htmlFor={option._id}>{option.valor}</label>
						</div>
					</div>
				);
			})}
		</React.Fragment>
	);
};

CloseOne.propTypes = {
	label: PropTypes.string.isRequired,
	hint: PropTypes.string,
	isReview: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	isEditing: PropTypes.bool,
	// id
	name: PropTypes.string.isRequired,
	/** Referencia a useForm */
	register: PropTypes.func.isRequired,
	default: PropTypes.string.isRequired
};

export default CloseOne;
