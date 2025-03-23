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

interface Category {
	id: number;
	name: string;
	create_at: string;
}

export const CategoriesList: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [editId, setEditedId] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [editedName, setEditedName] = useState<string>('');
	const [shouldFetch, setShouldFetch] = useState(false);
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

	const handleEditClick = (category: Category) => {
		setEditedId(category.id);
		setEditedName(category.name);
		setShowModal(true);
	};

	const handleDeleteClick = async (categoryId: number) => {
		try {
			const access_token = localStorage.getItem('access_token');
			const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
				method: 'DELETE',
				headers: { 'Authorization': `Bearer ${access_token}` },
			});
			setShouldFetch((prev) => !prev);
		} catch (error) {
			console.error('Erro ao excluir categoria:', error);
		}
	};

	const save = async () => {
		setStatus('idle');
		try {
			const access_token = localStorage.getItem('access_token');
			const response = await fetch(`http://localhost:3000/categories/${editId}`, {
				method: 'PATCH',
				headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' },
				body: JSON.stringify({ 'name': editedName }),
			});
			console.log(editedName);
			console.log(editId);
			setShouldFetch((prev) => !prev);
			setStatus('success');
		} catch (error) {
			setStatus('error');
			console.error('Erro ao buscar categorias:', error);
		}
		setTimeout(() => {
			setStatus('idle');
		}, 6000);
		setShowModal(false);
	};

	const cancel = () => {
		setShowModal(false);
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
	}, [shouldFetch]);

	return (
		<div className={styles.wrapper}>
			<Paper sx={{ backgroundColor: 'rgba(0, 2, 41, 0.54);', width: '90%', overflow: 'hidden', padding: 2, borderRadius: '20px' }}>
				<TableContainer className={styles.customContainer}>
					<Table className={styles.customTable}>
						<TableHead>
							<TableRow>
								<TableCell className={styles.customHeader}>ID</TableCell>
								<TableCell className={styles.customHeader}>Category name</TableCell>
								<TableCell className={styles.customHeader}>Created in</TableCell>
								<TableCell className={styles.customHeader}>
									Edit/Delete
									{status === 'success' && <FaCheckCircle size={18} color="#28a745" />}
									{status === 'error' && <FaTimesCircle size={18} color="#dc3545" />}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{categories.map((category) => (
								<TableRow key={category.id} className={styles.customRow}>
									<TableCell>{category.id} </TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>{new Date(category.create_at).toLocaleDateString('pt-BR')}</TableCell>
									<TableCell>
										<IconButton color="primary" onClick={() => handleEditClick(category)} aria-label="edit">
											<EditIcon />
										</IconButton>
										<IconButton color="secondary" onClick={() => handleDeleteClick(category.id)} aria-label="delete">
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
						<h2>Edit</h2>
						<div className={styles.modalText}>
							Name:
							<input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} placeholder="Enter category name" />
						</div>
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
