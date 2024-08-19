import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const DefaultPage = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white p-4'>
			<div className='w-full max-w-2xl text-center'>
				<h1 className='text-4xl font-bold mb-4'>
					Welcome to Expense <span className='text-green-500'>T</span>racker
				</h1>
				<p className='text-lg mb-6'>
					Keep track of your expenses and budgets effortlessly. Add, view, and
					manage your expenses and budgets all in one place.
				</p>
				{currentUser ? (
					<div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
						<FaUserCircle className='text-4xl mx-auto mb-4 text-green-500' />
						<h2 className='text-2xl font-semibold mb-2'>
							Welcome back,{' '}
							{currentUser.email.slice(0, currentUser.email.indexOf('@'))}!
						</h2>
						<p className='mb-4'>
							You can start managing your expenses and budgets.
						</p>
						<div className='flex justify-center space-x-4'>
							<Link
								to='/expenses'
								className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
							>
								View Expenses
							</Link>
							<Link
								to='/budgets'
								className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold'
							>
								View Budgets
							</Link>
						</div>
					</div>
				) : (
					<div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
						<h2 className='text-2xl font-semibold mb-4'>Get Started</h2>
						<p className='mb-4'>
							To start tracking your expenses, please log in or sign up.
						</p>
						<div className='flex justify-center space-x-4'>
							<Link
								to='/login'
								className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
							>
								Log In
							</Link>
							<Link
								to='/signup'
								className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold'
							>
								Sign Up
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DefaultPage;
