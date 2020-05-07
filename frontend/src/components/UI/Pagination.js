import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react'
import PropTypes from 'prop-types';

/**
 * Paginación para las tablas
*/

const Pag = props => {

	//se pages numbers
	//console.log('[Pagination.js] | total pages:', props.totalPages);

	const location = useLocation();
	const history = useHistory();

	const sendParamByPage = (_, { activePage }) => {
		//console.log(activePage);
		//history.replace(location.pathname + '?pag=' + activePage);
		history.push(location.pathname + '?pag=' + activePage);
	}

	const [currentPage, setCurrentPage] = useState(1);


	useEffect(() => {
		setCurrentPage(new URLSearchParams(location.search).get('pag'));
	}, [location])

	return (
	<div className="float-right">
	<Pagination
		onPageChange={sendParamByPage}
		//boundaryRange={1}
		//defaultActivePage={1}
		activePage={currentPage}
		//ellipsisItem={null}
		//firstItem={null}
		//lastItem={null}
		//siblingRange={1}
		totalPages={props.totalPages}
	/></div>);
}

Pag.propTypes = {
	totalPages: PropTypes.number.isRequired,
}

/** @component */
export default Pag;