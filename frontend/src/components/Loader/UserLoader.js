import React, { useState, useEffect } from 'react';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';

const UserLoader = () => {

	// values for field
	const [ values, setValues ] = useState([]);

	useEffect(() => {
		const total = Math.floor(Math.random() * 5) + 1;
		// console.log(total);
		const copia  = new Array(total);
		// console.log(copia.fill(0,0,total))
		setValues([...copia]);
	}, []);

	return(
	<Grid columns={3} stackable>
		{values.map((_,i) => (
			<Grid.Column key={i}>
			<Segment raised>
				<Placeholder>
					<Placeholder.Header image>
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Header>
					<Placeholder.Paragraph>
						<Placeholder.Line length="medium" />
						<Placeholder.Line length="short" />
					</Placeholder.Paragraph>
				</Placeholder>
			</Segment>
		</Grid.Column>
		))}
	</Grid>
)};

export default UserLoader;
