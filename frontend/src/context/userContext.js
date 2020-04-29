import React from 'react';

export default React.createContext({
	userIsLoggedIn: false,
	userType: '',
	isAdmin: false,
	authUser: (username, password) => {},
	logOut: token => {},
});