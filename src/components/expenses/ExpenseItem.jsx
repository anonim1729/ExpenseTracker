import React, { useState } from 'react';
import trash from '../../assets/trash.svg';
import { useContext } from 'react';
import { BudgetsContext } from '../../contexts/BudgetsContext';
import { ExpensesContext } from '../../contexts/ExpensesContext';
import {
	deleteExpense,
	getExpenses,
	updateBudgets,
} from '../../firebaseFunctions/firebase_functions';
import { AuthContext } from '../../contexts/AuthContext';

const ExpenseItem = ({ expense, restoreBudget }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { budgets, setBudgets } = useContext(BudgetsContext);
	const { expenses, setExpenses } = useContext(ExpensesContext);
	const [isDeleting, setIsDeleting] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	const handleDelete = async (id) => {
		setIsDeleting(true);
		const expense = expenses.find((exp) => exp.id === id);
		const budget = budgets.find((bud) => bud.name === expense.category);

		await deleteExpense(currentUser.uid, id);
		const newExpenses = await getExpenses(currentUser.uid);
		setExpenses(newExpenses);
		if (budget) {
			const updatedBudget = {
				...budget,
				balance: budget.balance + parseFloat(expense.amount),
			};
			await updateBudgets(currentUser.uid, budget.id, updatedBudget);
			const newBudgetList = budgets.map((bud) =>
				bud.name === expense.category ? updatedBudget : bud
			);

			setBudgets(newBudgetList);
		}
		console.log('budget restored');
		setIsDeleting(false);
		closeModal();
	};

	return (
		<>
			<li className='flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-md'>
				<div className='flex-1'>
					<div className='text-lg font-semibold'>{expense.name}</div>
					<div className='text-gray-400'>{expense.category}</div>
					{expense.description && (
						<div className='text-sm text-gray-500'>{expense.description}</div>
					)}
				</div>
				<div className='text-green-500 font-bold mr-4'>₹{expense.amount}</div>
				<img
					src={trash}
					alt='Delete'
					width={30}
					className='cursor-pointer hover:invert'
					onClick={openModal}
				/>
			</li>
			{modalIsOpen && (
				<div className='fixed inset-0 flex items-start justify-center bg-black bg-opacity-50'>
					<div className='bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-10 w-full max-w-md'>
						<h2 className='text-xl font-bold mb-4'>Confirm Deletion</h2>
						<p className='mb-4'>
							Amount will be restored to the budget. If you don't want that to
							happen, you can instead edit the expense.
						</p>
						{isDeleting && <p className='mb-4 text-red-500'>Deleting...</p>}
						<div className='flex justify-end space-x-4'>
							<button
								className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold'
								onClick={(e) => {
									handleDelete(expense.id);
								}}
							>
								Yes
							</button>
							<button
								className='px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-bold'
								onClick={closeModal}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ExpenseItem;
