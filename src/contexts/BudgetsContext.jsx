import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBudgets } from '../firebaseFunctions/firebase_functions';
import { AuthContext } from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const BudgetsContext = createContext();

const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const fetchBudgets = async () => {
		setIsLoading(true);
		try {
			const budgetsList = await getBudgets(currentUser.uid);
			setBudgets(budgetsList);
		} catch (error) {
			console.error('Error fetching budgets:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setIsLoading(true);
			if (user) {
				try {
					const budgetsList = await getBudgets(user.uid);
					setBudgets(budgetsList);
				} catch (error) {
					console.error('Error fetching budgets:', error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setBudgets([]);
				setIsLoading(false);
			}
		});

		return () => unsubscribe();
	}, [currentUser]);

	return (
		<BudgetsContext.Provider
			value={{ budgets, setBudgets, isLoading, fetchBudgets }}
		>
			{children}
		</BudgetsContext.Provider>
	);
};

BudgetsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { BudgetsContext, BudgetsProvider };
