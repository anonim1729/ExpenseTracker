import { useContext, useState } from 'react';
import { BudgetsContext } from '../../contexts/BudgetsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { updateBudgets } from '../../firebaseFunctions/firebase_functions';

const EditBudget = () => {
	const [budgetName, setBudgetName] = useState('');
	const [amount, setAmount] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const { budgets, setBudgets, fetchBudgets } = useContext(BudgetsContext);
	const { currentUser } = useContext(AuthContext);
	const [error, setError] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const budget = budgets.find((bud) => bud.id === id);
		console.log(budget);
		const spent = budget.amount - budget.balance;
		if (amount < spent) {
			setError('Amout cannot be less than already spent');
			console.log(error);
			return;
		}
		setError('');
		setIsUpdating(true);
		console.log('Budget Name:', budgetName);
		console.log('Amount:', amount);
		const newBudget = {
			name: budgetName ? budgetName : budget.name,
			amount: amount ? parseFloat(amount) : spent,
			balance: amount ? parseFloat(amount) - spent : 0,
		};
		try {
			await updateBudgets(currentUser.uid, id, newBudget);
			console.log('budget updated successfully');
		} catch (err) {
			console.log('error while updating budget : ', err);
		}
		await fetchBudgets();
		setIsUpdating(false);
		setBudgetName('');
		setAmount('');
		navigate('/budgets');
	};

	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white p-4'>
			<div className='w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg'>
				<h2 className='text-3xl font-bold mb-4 text-center'>Update Budget</h2>
				{error && <p className='text-red-600'>{error}</p>}
				{isUpdating && <p className='mb-4 text-green-500'>Updating...</p>}
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='amount'
							className='block font-medium mb-2'
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
					<button
						type='submit'
						className='w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
					>
						Update Budget
					</button>
				</form>
				<div className='mt-6 text-center'>
					<Link
						to='/budgets'
						className='inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
					>
						Back to Budgets
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EditBudget;
