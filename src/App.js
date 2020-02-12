import React, { useState } from 'react';
import { Header, Image, Segment, Sidebar } from 'semantic-ui-react';
// own
import SidebarNav from './components/Navs/Sidebar/Sidebar';
import TopNavbar from './components/Navs/TopNav/TopNav';

const App = () => {

	const [sideBarVisible, setSideBarVisible] = useState(true);

	return (
		<React.Fragment>
			<TopNavbar sideBarStatus={sideBarVisible} toggleSideBar={ () => setSideBarVisible(prev => !prev)}/>
			<Sidebar.Pushable as={Segment}>
				<SidebarNav sideBarStatus={sideBarVisible} hideSideBar={() => setSideBarVisible(false)}/>
				<Sidebar.Pusher dimmed={sideBarVisible}>
					<Segment basic>
						<Header as='h3'>Application Content</Header>
						<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
					</Segment>
				</Sidebar.Pusher>
				</Sidebar.Pushable>
		</React.Fragment>
	);
}

export default App;
