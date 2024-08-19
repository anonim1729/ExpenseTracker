import trash from '../../assets/trash.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import edit from '../../assets/edit.svg';

const BudgetItem = ({ budget, handleDelete, isDeleting }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	const percentageUsed = (amt, bal) => {
		return (bal / amt) * 100;
	};
	return (
		<>
			<li className='flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-md'>
				<div>
					<div className='text-lg font-semibold'>{budget.name}</div>
					<div className='text-green-500 font-bold'>₹{budget.amount}</div>
				</div>
				<div className='flex flex-col justify-center w-1/4'>
					<div className='relative pt-1'>
						<div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-600'>
							<div
								style={{
									width: `${percentageUsed(budget.amount, budget.balance)}%`,
								}}
								className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500'
							></div>
						</div>
					</div>
					<div
						className={`text-md ${
							percentageUsed(budget.amount, budget.balance) > 50
								? 'text-green-500'
								: 'text-rose-500'
						} text-center font-semibold`}
					>
						₹{budget.balance}
					</div>
				</div>
				<div className='btns flex'>
					<Link to={`/editbudget/${budget.id}`}>
						<img
							src={edit}
							alt=''
							className='cursor-pointer hover:invert ml-4'
							width={30}
						/>
					</Link>

					<img
						src={trash}
						alt=''
						onClick={openModal}
						className='cursor-pointer hover:invert ml-4'
						width={30}
					/>
				</div>
			</li>
			{modalIsOpen && (
				<div className='fixed inset-0 flex items-start justify-center bg-black bg-opacity-50'>
					<div className='bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-10 w-full max-w-md'>
						<h2 className='text-xl font-bold mb-4'>Confirm Deletion</h2>
						<p className='mb-4'>
							All associated expenses will also be deleted. Are you sure you
							want to proceed?
						</p>
						{isDeleting && <p className='mb-4 text-red-500'>Deleting...</p>}
						<div className='flex justify-end space-x-4'>
							<button
								className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold'
								onClick={() => handleDelete(budget.id)}
							>
								Yes
							</button>
							<button
								className='px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-bold'
								onClick={closeModal}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BudgetItem;
