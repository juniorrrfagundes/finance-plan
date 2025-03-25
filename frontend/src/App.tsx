import './App.css';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Categories } from './pages/Categories';
import { Transactions } from './pages/transactions';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="*" element={<Home />} /> {/* Rota padrão */}
				<Route path="/register" element={<Register />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/transactions" element={<Transactions />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
