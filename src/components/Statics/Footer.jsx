const Footer = () => {
	return (
		<footer className='bg-gray-800 text-white py-4 bottom-0 relative w-screen'>
			<div className='container mx-auto text-center'>
				<p>&copy; 2024 Expense Tracker. All rights reserved.</p>
				<p>
					<a
						href='https://www.example.com'
						className='text-gray-400 hover:text-white'
					>
						Privacy Policy
					</a>
					{' | '}
					<a
						href='https://www.example.com'
						className='text-gray-400 hover:text-white'
					>
						Terms of Service
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
