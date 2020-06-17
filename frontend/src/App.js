import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// ui
import { Segment, Sidebar } from 'semantic-ui-react';
// own
import SidebarNav from './components/Navs/Sidebar';
import TopNavbar from './components/Navs/TopNav';
// auth page
import Authenticate from './pages/Users/auth';
// own containers
import Dashboard from './pages/Dashboard/Dashboard';
// nna
import NNAs from './pages/NNAs/index';
import NNAsHistory from './pages/NNAs/history';
// user
import User from './pages/Users/index';
import UserProfile from './pages/Users/profile';
// templates
import Templates from './pages/Papers/TemplateIndex';
import CUTemplate from './pages/Papers/CUTemplate';
// format
//import Format from './pages/Papers/FormatIndex';
import RUFormat from './pages/Papers/RUFormat';
// history
import UserHistory from './pages/Users/history';

// context
import UserContext from './context/userContext';

import axios from './util/axios';

const App = () => {
	/** Controla, el **Sidebar**, icono en el **TopNav** y **Dimmer** en App */
	const [ sideBarVisible, setSideBarVisible ] = useState(false);

	// Controlar el estado del user con el context
	const [ userIsAuth, setUserIsAuth ] = useState(false); //false
	const [ userType, setUserType ] = useState(''); //''
	const [ user, setUser ] = useState(''); //useState({ _id: '5edc06381b5af10ded22c67e', nombre: 'rob', tipo: 'admin', username:'roberto' }); //''
	const [ errorAuth, setErrorAuth ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);

	const authenticateUser = (username, password) => {
		//console.log('iniciando sesion: ', username, password);
		setIsLoading(true);
		setErrorAuth(false);
		axios
			.post('/users/login', { username, password })
			.then((res) => {
				//console.log('authing', res.data);
				localStorage.setItem('token', JSON.stringify(res.data));
				axios.defaults.headers.common['Authorization'] = res.data._id
				setUserIsAuth(true);
				setUserType(res.data.tipo);
				setIsLoading(false);
				setUser(res.data);
			})
			.catch((err) => {
				console.log('Login error', err.response);
				if (err.response && err.response.data.message === 'Log in failed') {
					setErrorAuth('Log in failed');
				} else {
					setErrorAuth(true);
				}
				setIsLoading(false);
			});
	};

	const endSessionUser = () => {
		setUserIsAuth(false);
		setUserType('');
		localStorage.removeItem('token');
	};

	useEffect(() => {
		let token = localStorage.getItem('token');
		if (token) {
			try {
				token = JSON.parse(token);
				//console.log(token);
				setUserIsAuth(true);
				setUserType(token.tipo);
				setUser(token);
				axios.defaults.headers.common['Authorization'] = token._id;
			} catch (error) {
				console.log('err in local storage');
			}
		}
	}, []);

	return (
		<UserContext.Provider
			value={{
				isAuth: userIsAuth,
				currentUser: user,
				isAdmin: userType === 'admin',
				errorInAuth: errorAuth, // already exists, no exists, wrong pass
				clearError: setErrorAuth,
				isLoading: isLoading, // when authing
				logIn: authenticateUser,
				logOut: endSessionUser
			}}
		>
			<Router>
				{userIsAuth && (
					<TopNavbar
						sideBarStatus={sideBarVisible}
						toggleSideBar={() => setSideBarVisible((prev) => !prev)}
					/>
				)}
				<Sidebar.Pushable as={Segment} className="full-height">
					<SidebarNav sideBarStatus={sideBarVisible} hideSideBar={() => setSideBarVisible(false)} />
					<Sidebar.Pusher dimmed={sideBarVisible}>
						<Segment basic className="margin-top-bar">
							{!userIsAuth && <Redirect to="/" />}
							<Switch>
								<Route path="/" exact component={userIsAuth ? Dashboard : Authenticate} />
								{userIsAuth && <Route path="/perfil/:id" exact component={UserProfile} />}
								{userType === 'admin' && <Route path="/usuarios" exact component={User} />}
								<Route path="/nnas" exact component={NNAs} />
								<Route path="/nna/:id" exact component={NNAsHistory} />
								{userType === 'admin' && <Route path="/plantillas" exact component={Templates} />}
								{userType === 'admin' && <Route path="/plantilla/:id" exact component={CUTemplate} />}
								{/* <Route path="/formatos" exact component={Format} /> */}
								<Route path="/formato/:id" exact component={RUFormat} />
								<Route path="/historial/:id" exact component={UserHistory} />
								{userIsAuth && (
									<Route
										render={() => (
											<React.Fragment>
												<h2>
													Revisa
													<span role="img" aria-label="up">
														👆️
													</span>
													el menú
												</h2>
												<h1> Parece que esta URL no existe </h1>
											</React.Fragment>
										)}
									/>
								)}
							</Switch>
						</Segment>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
