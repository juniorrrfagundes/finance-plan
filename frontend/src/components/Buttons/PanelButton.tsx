import { useNavigate } from 'react-router-dom';
import styles from './PanelButton.module.css';

interface PanelButtonProps {
	url: string;
	text: string;
}

export const PanelButton: React.FC<PanelButtonProps> = ({ url, text }) => {
	const navigate = useNavigate();

	const func = () => {
		navigate(`/${url}`);
	};

	return (
		<>
			<button className={styles.button} onClick={func}>
				{text}
			</button>
		</>
	);
};
