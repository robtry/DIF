import React from 'react'

import Sidebar from './components/Navs/Sidebar/Sidebar';
import Navbar from './components/Navs/TopNav/TopNav';

const App = () => {
	return (
		<React.Fragment>
			<Navbar />
			<Sidebar />
		</React.Fragment>
	);
}

export default App;
