import React, { useState, useEffect } from 'react';
import styles from './CategoriesList.module.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Transaction {
	id: number;
	id_category: number;
	name_category: string;
	description: string;
	type: string;
	value: number;
	date_transaction: string;
}

interface Category {
	id: number;
	name: string;
	create_at: string;
}

export const TransactionsList: React.FC = () => {
	const [transaction, setTransaction] = useState<Transaction[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [formattedTransactions, setFormattedTransactions] = useState<Transaction[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [description, setdescription] = useState('');
	const [value, setValue] = useState('');
	const [type, setType] = useState('');
	const [date, setDate] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>('');

	const handleEditClick = (transaction: Transaction) => {
		setShowModal(true);
	};

	const save = () => {
		setShowModal(false);
	};

	const cancel = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const fetchTransaction = async () => {
			try {
				const access_token = localStorage.getItem('access_token');
				const response = await fetch('http://localhost:3000/transactions', {
					method: 'GET',
					headers: { 'Authorization': `Bearer ${access_token}` },
				});
				const data = await response.json();
				setTransaction(data);
			} catch (error) {
				console.error('Erro ao buscar transações:', error);
			}
		};

		const fetchCategory = async () => {
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

		fetchCategory();
		fetchTransaction();
	}, []);

	useEffect(() => {
		const updatedTransactions = transaction.map((x) => {
			const category = categories.find((item) => item.id === x.id_category);

			return {
				...x,
				name_category: category ? category.name : 'Sem categoria',
			};
		});
		console.log(updatedTransactions);
		setFormattedTransactions(updatedTransactions);
	}, [transaction, categories]);

	return (
		<div className={styles.wrapper}>
			<Paper sx={{ backgroundColor: 'rgba(0, 2, 41, 0.54);', width: '90%', overflow: 'hidden', padding: 2, borderRadius: '20px' }}>
				<TableContainer className={styles.customContainer}>
					<Table className={styles.customTable}>
						<TableHead>
							<TableRow>
								<TableCell className={styles.customHeader}>ID</TableCell>
								<TableCell className={styles.customHeader}>Category</TableCell>
								<TableCell className={styles.customHeader}>Description</TableCell>
								<TableCell className={styles.customHeader}>Value</TableCell>
								<TableCell className={styles.customHeader}>Type</TableCell>
								<TableCell className={styles.customHeader}>Date</TableCell>
								<TableCell className={styles.customHeader}>
									Edit/Delete
									{status === 'success' && <FaCheckCircle size={18} color="#28a745" />}
									{status === 'error' && <FaTimesCircle size={18} color="#dc3545" />}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{formattedTransactions.map((transaction) => (
								<TableRow key={transaction.id} className={styles.customRow}>
									<TableCell>{transaction.id} </TableCell>
									<TableCell>{transaction.name_category} </TableCell>
									<TableCell>{transaction.description}</TableCell>
									<TableCell>{transaction.value}</TableCell>
									<TableCell>{transaction.type}</TableCell>
									<TableCell>{new Date(transaction.date_transaction).toLocaleDateString('pt-BR')}</TableCell>
									<TableCell>
										<IconButton color="primary" onClick={() => handleEditClick(transaction)} aria-label="edit">
											<EditIcon />
										</IconButton>
										<IconButton color="secondary" onClick={() => console.log('')} aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

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
							<button onClick={save}>Save</button>
							<button onClick={cancel}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
