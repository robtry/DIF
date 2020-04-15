import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Separator = (props) => {
	return <Header size="large">{props.title}</Header>;
};

Separator.propTypes = {
	title: PropTypes.string.isRequired,
	isEditing: PropTypes.bool
};

export default Separator;
