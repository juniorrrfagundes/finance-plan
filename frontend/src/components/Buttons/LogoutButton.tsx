import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';

export const LogoutButton: React.FC = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('access_token');
		navigate('/home');
	};

	return (
		<>
			<button className={styles.button} onClick={logout}>
				Logout
			</button>
		</>
	);
};
