import React from 'react';

export default React.createContext({
	isAuth: false,
	currentUser: '',
	isAdmin: false,

	errorInAuth: false, // already exists, no exists, wrong pass
	clearError: () => {},

	isLoading: false, // when authing

	logIn: (username, password) => {},
	singUp: (username, password) => {},
	logOut: () => {}
});
