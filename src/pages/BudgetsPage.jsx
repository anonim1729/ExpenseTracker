import { Link } from 'react-router-dom';
import { BudgetsContext } from '../contexts/BudgetsContext';
import { useContext, useState } from 'react';
import BudgetItem from '../components/budgets/BudgetItem';
import { ExpensesContext } from '../contexts/ExpensesContext';
import { AuthContext } from '../contexts/AuthContext';
import {
	deleteBudget,
	getBudgets,
	getExpenses,
} from '../firebaseFunctions/firebase_functions.js';
const BudgetsPage = () => {
	const { budgets, setBudgets, isLoading, fetchBudgets } =
		useContext(BudgetsContext);
	const [isDeleting, setIsDeleting] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const { expenses, setExpenses, fetchExpenses } = useContext(ExpensesContext);

	const handleDelete = async (id) => {
		const budget = budgets.find((bud) => bud.id === id);
		setIsDeleting(true);
		try {
			await deleteBudget(currentUser.uid, id);
		} catch (error) {
			console.error('Error deleting budget:', error);
		}
		await fetchExpenses();
		await fetchBudgets();
		const newExpenses = expenses.filter((exp) => exp.id != id);
		setIsDeleting(false);
		console.log(budget);
	};
	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white p-4'>
			<div className='w-full max-w-2xl overflow-y-auto bg-gray-800 p-6 rounded-lg shadow-lg'>
				<h1 className='text-3xl font-bold mb-6 text-center'>Budgets</h1>
				<div className='mt-6 mb-6 text-center'>
					<Link
						to='/addbudget'
						className='inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
					>
						Add Budget
					</Link>
				</div>
				<ul className='space-y-4'>
					{isLoading ? (
						<p className='text-center text-gray-500'>Loading ...</p>
					) : budgets && budgets.length > 0 ? (
						budgets.map((budget, index) => (
							<BudgetItem
								key={index}
								budget={budget}
								isDeleting={isDeleting}
								handleDelete={handleDelete}
							/>
						))
					) : (
						<p className='text-center text-gray-500'>No budgets to display</p>
					)}
				</ul>
			</div>
		</div>
	);
};

export default BudgetsPage;
