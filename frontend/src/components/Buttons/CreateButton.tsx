import { useState } from 'react';
import styles from './CreateButton.module.css';

export const CreateButton: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');

	const create = () => {
		setShowModal(true);
	};

	const saveName = () => {
		console.log('Nome salvo:', name);
		setShowModal(false);
	};

	return (
		<>
			<button className={styles.button} onClick={create}>
				Create
			</button>

			{showModal && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<h2>Enter category name</h2>
						<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" />
						<div className={styles.modalButtons}>
							<button onClick={saveName}>Save</button>
							<button onClick={() => setShowModal(false)}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
