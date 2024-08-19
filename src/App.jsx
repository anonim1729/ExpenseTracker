import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import DefaultPage from './pages/DefaultPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ExpensesPage from './pages/ExpensesPage';
import BudgetsPage from './pages/BudgetsPage';
import AddExpense from './components/expenses/AddExpense';
import AddBudget from './components/budgets/AddBudget';
import ExpenseItem from './components/expenses/ExpenseItem';
import BudgetItem from './components/budgets/BudgetItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/profile/Dashboard';
import EditBudget from './components/budgets/EditBudget';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			children: [
				{
					index: true,
					element: <DefaultPage />,
				},
				{
					path: '/login',
					element: <Login />,
				},
				{
					path: '/signup',
					element: <Register />,
				},
				{
					path: '/expenses',
					element: <ExpensesPage />,
				},
				{
					path: '/budgets',
					element: <BudgetsPage />,
				},
				{
					path: '/addexpense',
					element: <AddExpense />,
				},
				{
					path: '/addbudget',
					element: <AddBudget />,
				},
				{
					path: '/expenses/:id',
					element: <ExpenseItem />,
				},
				{
					path: '/budgets/:id',
					element: <BudgetItem />,
				},
				{
					path: '/profile',
					element: <Dashboard />,
				},
				{
					path: '/editbudget/:id',
					element: <EditBudget />,
				},
			],
		},
	]);
	return (
		<div className='App'>
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
}

export default App;
