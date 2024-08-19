import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BudgetsProvider } from './contexts/BudgetsContext.jsx';
import { ExpensesProvider } from './contexts/ExpensesContext.jsx';
// import { ExpensesContext } from './contexts/ExpensesContext.jsx'
// import { BudgetsContext } from './contexts/BudgetsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<ExpensesProvider>
			<BudgetsProvider>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BudgetsProvider>
		</ExpensesProvider>
	</AuthProvider>
);
