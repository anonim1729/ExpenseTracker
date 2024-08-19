import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpensesContext } from '../../contexts/ExpensesContext';
import { BudgetsContext } from '../../contexts/BudgetsContext';
import { AuthContext } from '../../contexts/AuthContext';
import {
	updateBudgets,
	addExpense,
} from '../../firebaseFunctions/firebase_functions';

const AddExpense = () => {
	const { fetchExpenses } = useContext(ExpensesContext);
	const { budgets, setBudgets } = useContext(BudgetsContext);
	const { currentUser } = useContext(AuthContext);
	const [name, setName] = useState('');
	const [isAdding, setIsAdding] = useState(false);
	const [category, setCategory] = useState(budgets[0]?.name || ''); // Default to first budget category if available
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [dataError, setDataError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!currentUser) {
			setDataError('User not authenticated.');
			return;
		}

		const budget = budgets.find((bud) => bud.name === category);
		if (budget) {
			const expenseAmount = parseFloat(amount);
			if (isNaN(expenseAmount) || expenseAmount <= 0) {
				setDataError('Please enter a valid amount.');
				return;
			}

			if (budget.balance < expenseAmount) {
				setDataError('You are exceeding your budget!');
				return;
			}

			const updatedBudget = {
				...budget,
				balance: budget.balance - expenseAmount,
			};
			setIsAdding(true);
			try {
				await updateBudgets(currentUser.uid, budget.id, updatedBudget);
				const newBudgetList = budgets.map((bud) =>
					bud.name === category ? updatedBudget : bud
				);

				setBudgets(newBudgetList);

				const newExpense = {
					name,
					category,
					amount: expenseAmount,
					description,
				};

				await addExpense(currentUser.uid, newExpense);
				await fetchExpenses();
			} catch (error) {
				setDataError('Error adding expense. Please try again.');
				console.error('Error:', error);
			} finally {
				setIsAdding(false);
				navigate('/expenses');
			}
		} else {
			setDataError('Selected budget category does not exist.');
		}
	};

	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white p-4'>
			<div className='w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg'>
				{budgets.length > 0 ? (
					<>
						<h1 className='text-3xl font-bold mb-6 text-center'>Add Expense</h1>
						{isAdding && <p className='mb-4 text-green-500'>adding...</p>}
						<form
							onSubmit={handleSubmit}
							className='space-y-4'
						>
							<p className='text-red-600'>{dataError}</p>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-gray-300'
								>
									Expense Name
								</label>
								<input
									type='text'
									id='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='category'
									className='block text-sm font-medium text-gray-300'
								>
									Category
								</label>
								<select
									id='category'
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className='w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500'
									required
								>
									{budgets.map((budget, index) => (
										<option
											key={index}
											value={budget.name}
										>
											{budget.name}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor='amount'
									className='block text-sm font-medium text-gray-300'
								>
									Amount
								</label>
								<input
									type='number'
									id='amount'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className='w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='description'
									className='block text-sm font-medium text-gray-300'
								>
									Description (Optional)
								</label>
								<textarea
									id='description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className='w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500'
									rows='3'
								></textarea>
							</div>
							<button
								type='submit'
								className='w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
							>
								Add Expense
							</button>
						</form>
					</>
				) : (
					<h1>Add a Budget First</h1>
				)}
			</div>
		</div>
	);
};

export default AddExpense;
