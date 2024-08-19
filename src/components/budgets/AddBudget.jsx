import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BudgetsContext } from '../../contexts/BudgetsContext';
import { AuthContext } from '../../contexts/AuthContext';
import {
	addBudget,
	getBudgets,
} from '../../firebaseFunctions/firebase_functions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBudget = () => {
	const [budgetName, setBudgetName] = useState('');
	const [amount, setAmount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { budgets, setBudgets, fetchBudgets } = useContext(BudgetsContext);
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		console.log('Budget Name:', budgetName);
		console.log('Amount:', amount);
		const newBudget = {
			name: budgetName,
			amount,
			balance: amount,
		};
		await addBudget(currentUser.uid, newBudget);
		const newBudgetList = await fetchBudgets();
		toast(`new budget "${budgetName}" added!`, {
			theme: 'dark',
			autoClose: 2000,
		});
		setBudgetName('');
		setAmount('');
		setIsLoading(false);
		navigate('/budgets');
	};

	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white p-4'>
			<div className='w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg'>
				<h2 className='text-3xl font-bold mb-4 text-center text-green-500'>
					Add Budget
				</h2>
				{isLoading && <p className='mb-4 text-green-500'>adding...</p>}
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='budgetName'
							className='block font-medium mb-2'
						>
							Budget Name
						</label>
						<input
							type='text'
							id='budgetName'
							value={budgetName}
							onChange={(e) => setBudgetName(e.target.value)}
							className='w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500'
							required
						/>
					</div>
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
						Add Budget
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

export default AddBudget;
