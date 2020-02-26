import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// ui
import { Segment, Sidebar } from 'semantic-ui-react';
// own
import SidebarNav from './components/Navs/Sidebar/Sidebar';
import TopNavbar from './components/Navs/TopNav/TopNav';
// auth page
import Authenticate from './pages/auth';
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


const App = () => {

	/** Controla, el **Sidebar**, icono en el **TopNav** y **Dimmer** en App */
	const [sideBarVisible, setSideBarVisible] = useState(false);
	// tmp usser, will be in react context
	const userIsLoggedIn = true;

	return (
	<Router>
		{ userIsLoggedIn && 
		<TopNavbar sideBarStatus={sideBarVisible} toggleSideBar={ () => setSideBarVisible(prev => !prev) }/> }
		<Sidebar.Pushable as={Segment} className='full-height'>
			<SidebarNav sideBarStatus={sideBarVisible} hideSideBar={() => setSideBarVisible(false)}/>
			<Sidebar.Pusher dimmed={sideBarVisible}>
				<Segment basic className='margin-top-bar'>
					<Switch>
						<Route path='/' exact component={userIsLoggedIn ? Dashboard : Authenticate}/>
						<Route path='/profile/:id' exact component={UserProfile}/>
						<Route path='/admins' exact render={ () => <User type='admin' /> } />
						<Route path='/medicos' exact render={ () => <User type='medico' /> } />
						<Route path='/abogados' exact render={ () => <User type='abogado' /> } />
						<Route path='/tssocial' exact render={ () => <User type='tsocial' /> } />
						<Route path='/psicologos' exact render={ () => <User type='psicologo' /> } />
						<Route path='/nnas' exact component={NNAs} /> } />
						<Route path='/plantillas' exact component={Templates} />
						<Route path='/formatos' exact component={Format} />
						<Route render={ () => <h1> Bad route </h1> }/>
					</Switch>
					{ !userIsLoggedIn && <Redirect to='/'/> }
				</Segment>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	</Router>
	);
}

export default App;
