import React from 'react';
import PropTypes from 'prop-types';
//own
//hoc
//context
//css

const User = (props) => {
return (<p>User: {props.type}</p>);
}

User.propTypes = {
	type: PropTypes.string.isRequired,
}

export default User;