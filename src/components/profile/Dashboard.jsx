import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
	const { currentUser: user } = useContext(AuthContext);

	return (
		<div className='flex flex-col flex-grow items-center justify-center bg-gray-900 text-white'>
			<div className="container mx-auto p-4">
				<div className="flex flex-col items-center">
					<FontAwesomeIcon icon={faUserCircle} className="text-8xl mb-4 text-gray-400" />
					<div className="bg-gray-800 text-white p-6 rounded shadow-lg w-full max-w-md">
						<h3 className="text-2xl font-bold mb-4">User Details</h3>
						<p className="mb-2"><strong>Name:</strong> {user.email.slice(0, user.email?.indexOf('@'))}</p>
						<p className="mb-2"><strong>Email:</strong> {user.email}</p>
						<p className="mb-2"><strong>UID:</strong> {user.uid}</p>
						{/* Add more user details here if available */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
