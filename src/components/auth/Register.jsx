// src/pages/RegisterPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { signup } = useContext(AuthContext);
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			return setError('Passwords do not match');
		}
		try {
			setIsLoading(true);
			await signup(email, password);
			setTimeout(() => {
				setIsLoading(false);
				setEmail('');
				setPassword('');
				setPasswordConfirm('');
				navigate('/');
			}, 2000);
		} catch (error) {
			setError('Failed to create an account');
		} finally {
		}
	};

	return (
		<div className='flex justify-center items-center flex-grow bg-gray-900'>
			<div className='bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
				{error && !isLoading && <p className='mb-4 text-red-500'>{error}</p>}
				{!error && isLoading && (
					<p className='mb-4 text-green-500'>Signing up...</p>
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
					<div className='mb-4'>
						<label
							htmlFor='passwordConfirm'
							className='block text-sm font-medium mb-2'
						>
							Confirm Password
						</label>
						<input
							type='password'
							id='passwordConfirm'
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold'
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
