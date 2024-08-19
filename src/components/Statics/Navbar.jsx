// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import home from '../../assets/home.svg';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
	const { currentUser, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!currentUser) {
			toast('Logged out!', {
				theme: 'dark',
			});
			navigate('/');
		}
	}, [currentUser, navigate]);
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch {
			console.error('Failed to log out');
		}
	};

	return (
		<nav className='bg-gray-800 p-4 top-0 relative w-screen'>
			<div className='container mx-auto flex justify-between items-center'>
				<Link
					to='/'
					className='text-white text-lg font-bold flex hover:bg-slate-900 hover:rounded-full p-2'
				>
					<img
						src={home}
						alt=''
						width={20}
					/>
					<span className='m-1 '>Expense Tracker</span>
				</Link>
				<div className='flex space-x-4'>
					{currentUser ? (
						<>
							<Link
								to='/expenses'
								className='text-white hover:text-gray-400 p-2 mx-2 hover:bg-slate-900 hover:rounded-full'
							>
								Expenses
							</Link>

							<Link
								to='/budgets'
								className='text-white hover:text-gray-400 p-2 mx-2 hover:bg-slate-900 hover:rounded-full'
							>
								Budgets
							</Link>

							<button
								onClick={handleLogout}
								className='text-white hover:text-gray-400 p-2 mx-2 hover:bg-slate-900 hover:rounded-full'
							>
								logout
							</button>
							<Link to='/profile'>
								<FaUserCircle className='text-4xl mx-2 text-green-500 p-2 hover:bg-slate-900 hover:rounded-full' />
							</Link>
						</>
					) : (
						<>
							<Link
								to='/login'
								className='text-white hover:text-gray-400 p-2 hover:bg-slate-900 hover:rounded-full'
							>
								Login
							</Link>
							<Link
								to='/signup'
								className='text-white hover:text-gray-400 p-2 hover:bg-slate-900 hover:rounded-full'
							>
								Signup
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
