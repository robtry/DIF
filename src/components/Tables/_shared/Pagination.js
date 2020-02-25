import React from 'react';
import { Pagination } from 'semantic-ui-react'

/**
 * Paginación para las tablas
*/

const Pag = () => {
	return (
	<div className="float-right">
	<Pagination
		boundaryRange={0}
		defaultActivePage={1}
		ellipsisItem={null}
		firstItem={null}
		lastItem={null}
		siblingRange={1}
		totalPages={10}
	/></div>);
}

/** @component */
export default Pag;