import { useState } from 'react';
import styles from './CreateButtonCategories.module.css';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface fetch {
	setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateButtonCategories: React.FC<fetch> = ({ setShouldFetch }) => {
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const access_token = localStorage.getItem('access_token');

	const create = () => {
		setShowModal(true);
	};

	const saveName = async () => {
		setShowModal(false);
		setError('');
		setSuccess('');
		setStatus('loading');
		try {
			const response = await fetch('http://localhost:3000/categories', {
				method: 'POST',
				headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' },
				body: JSON.stringify({ name }),
			});
			const data = await response.json();
			setShouldFetch((prev) => !prev);
			if (response.ok) {
				setStatus('success');
				setSuccess(data.message || 'Success');
			} else {
				setStatus('error');
				setError(data.message || 'Unexpected Error');
			}
		} catch (error) {
			setStatus('error');
			setError('Unexpected Error');
		}

		setTimeout(() => {
			setStatus('idle');
			setError('');
			setSuccess('');
		}, 6000);
		setName('');
	};

	const cancel = () => {
		setShowModal(false);
		setName('');
	};

	return (
		<>
			<div className={styles.createContainer}>
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
				{error && <p className={styles.error}>{error}</p>}
				{success && <p className={styles.success}>{success}</p>}
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
