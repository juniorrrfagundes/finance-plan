import './App.css';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="*" element={<Home />} /> {/* Rota padrão */}
				<Route path="/register" element={<Register />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
