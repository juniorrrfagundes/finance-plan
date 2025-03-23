import React, { useState, useEffect } from 'react';
import styles from './CategoriesList.module.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Category {
	id: number;
	name: string;
	create_at: string;
}

export const CategoriesList: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

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

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
							</TableRow>
						</TableHead>
						<TableBody>
							{categories.map((category) => (
								<TableRow key={category.id} className={styles.customRow}>
									<TableCell>{category.id} </TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>{new Date(category.create_at).toLocaleDateString('pt-BR')}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
};
