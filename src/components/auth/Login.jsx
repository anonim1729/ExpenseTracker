import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { login, currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [error, setError] = useState('');

	useEffect(() => {
		if (currentUser) {
			const userEmail = currentUser.email;
			toast(`Welcome back, ${userEmail.slice(0, userEmail.indexOf('@'))}`, {
				theme: 'dark',
			});
			navigate('/');
		}
	}, [currentUser, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true); // Set loading state before login attempt
		try {
			await login(email, password);
			console.log('login successful');
		} catch (error) {
			setIsLoading(false); // Reset loading state on error
			if (
				error.code === 'auth/invalid-credential' ||
				error.code === 'auth/wrong-password' ||
				error.code === 'auth/user-not-found'
			) {
				setError('Invalid email or password. Please try again.');
			} else {
				setError('An unexpected error occurred. Please try again later.');
			}
		}
	};

	return (
		<div className='flex justify-center items-center flex-grow bg-gray-900'>
			<div className='bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
				{error && !isLoading && <p className='mb-4 text-red-500'>{error}</p>}
				{!error && isLoading && (
					<p className='mb-4 text-green-500'>Signing in...</p>
				)}
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-sm font-medium mb-2'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500'
							required
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-sm font-medium mb-2'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
						disabled={isLoading}
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
