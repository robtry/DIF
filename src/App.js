import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ui
import {Segment, Sidebar } from 'semantic-ui-react';
// own
import SidebarNav from './components/Navs/Sidebar/Sidebar';
import TopNavbar from './components/Navs/TopNav/TopNav';
// own containers
import Dashboard from './pages/Dashboard/Dashboard';
import User from './pages/Users/Users';
import NNAs from './pages/NNAs/NNAs';
import Templates from './pages/Templates/Templates';
import Format from './pages/Formats/Formats';
import AuxTables from './pages/AuxTables/AuxTables';


const App = () => {

	/** Controla, el **Sidebar**, icono en el **TopNav** y **Dimmer** en App */
	const [sideBarVisible, setSideBarVisible] = useState(true);

	return (
	<Router>
		<TopNavbar sideBarStatus={sideBarVisible} toggleSideBar={ () => setSideBarVisible(prev => !prev) }/>
		<Sidebar.Pushable as={Segment}>
			<SidebarNav sideBarStatus={sideBarVisible} hideSideBar={() => setSideBarVisible(false)}/>
			<Sidebar.Pusher dimmed={sideBarVisible}>
				<Segment basic className='temp'>
					<Switch>
						<Route path='/' exact component={Dashboard}/>
						<Route path='/admins' exact render={ () => <User type='admin' /> } />
						<Route path='/medicos' exact render={ () => <User type='medico' /> } />
						<Route path='/abogados' exact render={ () => <User type='abogado' /> } />
						<Route path='/tssocial' exact render={ () => <User type='tsocial' /> } />
						<Route path='/psicologos' exact render={ () => <User type='psicologo' /> } />
						<Route path='/nnas' exact component={NNAs} /> } />
						<Route path='/plantillas' exact component={Templates} />
						<Route path='/formatos' exact component={Format} />
						<Route path='/auxiliares' exact component={AuxTables} />
						<Route render={ () => <h1> Bad route </h1> }/>
					</Switch>
				</Segment>
			</Sidebar.Pusher>
			</Sidebar.Pushable>


	</Router>
	);
}

export default App;
