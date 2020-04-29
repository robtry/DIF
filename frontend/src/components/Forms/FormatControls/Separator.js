import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Separator = (props) => {
	return <Header size="large" textAlign='center'>{props.title}</Header>;
};

Separator.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Separator;
