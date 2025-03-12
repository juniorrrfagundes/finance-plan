import { useNavigate } from 'react-router-dom';
import styles from './SingupButton.module.css';

export const SingupButton: React.FC = () => {
	const navigate = useNavigate();

	const singup = () => {
		navigate('/register');
	};

	return (
		<>
			<button className={styles.button} onClick={singup}>
				Singup
			</button>
		</>
	);
};
