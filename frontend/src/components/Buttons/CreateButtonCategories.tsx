import { useState } from 'react';
import styles from './CreateButtonCategories.module.css';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const CreateButtonCategories: React.FC = () => {
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const access_token = localStorage.getItem('access_token');

	const create = () => {
		setShowModal(true);
	};

	const saveName = async () => {
		console.log(access_token);
		setStatus('loading');
		try {
			const response = await fetch('http://localhost:3000/categories', {
				method: 'POST',
				headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' },
				body: JSON.stringify({ name }),
			});
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				setStatus('success');
			} else {
				setStatus('error');
			}
		} catch (error) {
			setStatus('error');
			console.log(`Unexpected Error: ${error}`);
		}

		setTimeout(() => setStatus('idle'), 3000);
		console.log('Nome salvo:', name);
		setShowModal(false);
		setName('');
	};

	const cancel = () => {
		setShowModal(false);
		setName('');
	};

	return (
		<>
			<div>
				<button className={styles.button} onClick={create}>
					Create
				</button>
				{status === 'loading' && (
					<span className="icon-spin">
						<FaSpinner size={18} color="#f1c40f" />
					</span>
				)}
				{status === 'success' && <FaCheckCircle size={18} color="#28a745" />}
				{status === 'error' && <FaTimesCircle size={18} color="#dc3545" />}
			</div>

			{showModal && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<h2>Create Category</h2>
						<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" />
						<div className={styles.modalButtons}>
							<button onClick={saveName}>Save</button>
							<button onClick={cancel}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
