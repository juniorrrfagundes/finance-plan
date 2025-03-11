import './App.css';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="*" element={<Home />} /> {/* Rota padrão */}
				<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
