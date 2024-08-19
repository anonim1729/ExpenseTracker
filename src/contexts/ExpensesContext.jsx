import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getExpenses } from '../firebaseFunctions/firebase_functions';
import { AuthContext } from './AuthContext';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ExpensesContext = createContext();

const ExpensesProvider = ({ children }) => {
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const fetchExpenses = async () => {
		setIsLoading(true);
		try {
			const expensesList = await getExpenses(currentUser.uid);
			setExpenses(expensesList);
		} catch (error) {
			console.log('Error fetching expenses:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setIsLoading(true);
			if (user) {
				try {
					const budgetsList = await getExpenses(user.uid);
					setExpenses(budgetsList);
				} catch (error) {
					console.error('Error fetching budgets:', error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setExpenses([]);
				setIsLoading(false);
			}
		});

		return () => unsubscribe();
	}, [currentUser]);

	return (
		<ExpensesContext.Provider
			value={{ expenses, setExpenses, isLoading, fetchExpenses }}
		>
			{children}
		</ExpensesContext.Provider>
	);
};

ExpensesProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { ExpensesContext, ExpensesProvider };
