import { Outlet } from 'react-router-dom';
import Navbar from '../Statics/Navbar';
import Footer from '../Statics/Footer';

const RootLayout = () => {
	return (
		<div className='flex flex-col min-h-screen rootlayout overflow-x-hidden max-w-full'>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};
export default RootLayout;
