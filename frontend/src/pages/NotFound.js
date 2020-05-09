import React from 'react';
import { Container } from 'semantic-ui-react';

const NotFoundPage = () => {
	return (
		<Container>
			<h1> No se encontraron coincidencias </h1>
			<h2>
				<span role="img" aria-label="up">
					👆️
				</span>
				Es probable que el URL este incompleto, el registro ya fue eliminado o cambió
			</h2>
		</Container>
	);
};

export default NotFoundPage;
