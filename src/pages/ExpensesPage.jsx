import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ExpensesContext } from '../contexts/ExpensesContext';
import ExpenseItem from '../components/expenses/ExpenseItem';

const ExpensesPage = () => {
	const { expenses, isLoading } = useContext(ExpensesContext);

	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white p-4'>
			<div className='w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg'>
				<h1 className='text-3xl font-bold mb-6 text-center'>Expenses</h1>
				<div className='mt-6 mb-6 text-center'>
					<Link
						to='/addexpense'
						className='inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
					>
						Add Expense
					</Link>
				</div>
				{isLoading ? (
					<p className='text-center text-gray-500'>Loading ...</p>
				) : (
					<ul className='space-y-4'>
						{expenses.length > 0 ? (
							expenses.map((expense, index) => (
								<ExpenseItem
									key={index}
									expense={expense}
								/>
							))
						) : (
							<p className='text-center text-gray-500'>No expenses to show</p>
						)}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ExpensesPage;
