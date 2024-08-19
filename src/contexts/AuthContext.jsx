// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../config/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const signup = async (email, password) => {
		try {
			const cred = await createUserWithEmailAndPassword(auth, email, password);
			console.log(cred.user);
			setCurrentUser(cred.user);
		} catch (err) {
			throw err;
		}
	};

	const login = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setCurrentUser(userCredential.user);
		} catch (err) {
			throw new Error(err.message);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null);
		} catch (err) {
			console.error('Error logging out:', err);
		}
	};

	return (
		<AuthContext.Provider value={{ currentUser, signup, login, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
