import { useState, useEffect } from 'react';
import styles from './CreateButtonTransactions.module.css';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface fetch {
	setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Category {
	id: number;
	name: string;
	create_at: string;
}

export const CreateButtonTransactions: React.FC<fetch> = ({ setShouldFetch }) => {
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [showModal, setShowModal] = useState(false);
	const [description, setdescription] = useState('');
	const [value, setValue] = useState('');
	const [type, setType] = useState('');
	const [date, setDate] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>('');

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
			const response = await fetch('http://localhost:3000/transactions', {
				method: 'POST',
				headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id_category: selectedCategoryId,
					description: description,
					value: value,
					type: type,
					date_transaction: date,
				}),
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
		setdescription('');
		setValue('');
		setType('');
		setDate('');
		setSelectedCategoryId('');
	};

	const cancel = () => {
		setShowModal(false);
		setdescription('');
		setValue('');
		setType('');
		setDate('');
		setSelectedCategoryId('');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const access_token = localStorage.getItem('access_token');
				const response = await fetch('http://localhost:3000/categories', {
					method: 'GET',
					headers: { 'Authorization': `Bearer ${access_token}` },
				});
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error('Erro ao buscar categorias:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		console.log('Categorias atualizadas:', categories);
	}, [categories]);

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
						<h2>Create Transaction</h2>
						<select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
							<option value="">Select Category</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Enter description" />
						<input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />
						<select value={type} onChange={(e) => setType(e.target.value)}>
							<option value="">Select Type</option>
							<option value="income">Income</option>
							<option value="expense">Expense</option>
						</select>
						<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
