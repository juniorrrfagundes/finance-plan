import { useNavigate } from 'react-router-dom';
import styles from './LoginButton.module.css';

export const LoginButton: React.FC = () => {
	const navigate = useNavigate();

	const login = () => {
		navigate('/home');
	};

	return (
		<>
			<button className={styles.button} onClick={login}>
				Login
			</button>
		</>
	);
};
