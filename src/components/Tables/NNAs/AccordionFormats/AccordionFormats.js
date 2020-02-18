import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

export default class AccordionFormat extends Component {

	state = { activeIndex: -1 }

	handleClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeIndex } = this.state
		const newIndex = activeIndex === index ? -1 : index

		this.setState({ activeIndex: newIndex })
	}

	render() {
		const { activeIndex } = this.state

		return (
			<Accordion>
				<Accordion.Title
					active={activeIndex === 0}
					index={0}
					onClick={this.handleClick}
				>
					<Icon name='dropdown' />
					Legal
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
						btn A
				</Accordion.Content>

				<Accordion.Title
					active={activeIndex === 1}
					index={1}
					onClick={this.handleClick}
				>
					<Icon name='dropdown' />
					Psicológico
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 1}>
					btn B
				</Accordion.Content>

				<Accordion.Title
					active={activeIndex === 2}
					index={2}
					onClick={this.handleClick}
				>
					<Icon name='dropdown' />
					Médico
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 2}>
					btn C
				</Accordion.Content>

				<Accordion.Title
					active={activeIndex === 3}
					index={3}
					onClick={this.handleClick}
				>
					<Icon name='dropdown' />
					T Social
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 3}>
					btn D
				</Accordion.Content>

			</Accordion>
		)
	}
}