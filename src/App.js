import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// ui
import { Segment, Sidebar } from 'semantic-ui-react';
// own
import SidebarNav from './components/Navs/Sidebar/Sidebar';
import TopNavbar from './components/Navs/TopNav/TopNav';
// auth page
import Authenticate from './pages/Users/auth';
// own containers
import Dashboard from './pages/Dashboard/Dashboard';
// nna
import NNAs from './pages/NNAs/index';
// user
import User from './pages/Users/index';
import UserProfile from './pages/Users/profile';
// templates
import Templates from './pages/Templates/index';
// format
import Format from './pages/Formats/index';
// history
import History from './pages/History/index';

// context
import UserContext from './context/userContext';

const App = () => {

	/** Controla, el **Sidebar**, icono en el **TopNav** y **Dimmer** en App */
	const [sideBarVisible, setSideBarVisible] = useState(false);

	// Controlar el estado del user
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(true); //false
	const [userType, setUserType] = useState('admin'); //''

	const authenticateUser = (username, password) => {
		console.log('iniciando sesion: ', username, password);
		setUserIsLoggedIn(true);
		setUserType('admin');
	}

	const endSessionUser = (token) => {
		console.log('terminando sesion', token);
		setUserIsLoggedIn(false);
		setUserType('');
	}

	return (
	<UserContext.Provider value={{
			userIsLoggedIn: userIsLoggedIn,
			userType: userType,
			isAdmin: userType === 'admin',
			authUser: authenticateUser,
			logOut: endSessionUser,
		}}
	>
		<Router>
			{ userIsLoggedIn && 
			<TopNavbar sideBarStatus={sideBarVisible} toggleSideBar={ () => setSideBarVisible(prev => !prev) }/> }
			<Sidebar.Pushable as={Segment} className='full-height'>
				<SidebarNav sideBarStatus={sideBarVisible} hideSideBar={() => setSideBarVisible(false)}/>
				<Sidebar.Pusher dimmed={sideBarVisible}>
					<Segment basic className='margin-top-bar'>
						{ !userIsLoggedIn && <Redirect to='/'/> }
						<Switch>
							<Route path='/' exact component={userIsLoggedIn ? Dashboard : Authenticate}/>
							<Route path='/profile/:id' exact component={UserProfile}/>
							{ userType === 'admin' && <Route path='/usuarios' exact component={User} />}
							<Route path='/nnas' exact component={NNAs} /> } />
							{ userType === 'admin' && <Route path='/plantillas' exact component={Templates} />}
							<Route path='/formatos' exact component={Format} />
							<Route path='/historial/:id' exact component={History} />
							<Route render={ () => <h1> Bad route </h1> }/>
						</Switch>
					</Segment>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Router>
	</UserContext.Provider>
	);
}

export default App;
