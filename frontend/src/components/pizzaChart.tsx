import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from './pizzaChart.module.css';

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

export const PizzaChart: React.FC = () => {
	const [transaction, setTransaction] = useState<Transaction[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [formattedTransactions, setFormattedTransactions] = useState<Transaction[]>([]);
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
	const token = localStorage.getItem('access_token');
	const [shouldFetch, setShouldFetch] = useState(false);

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
	}, [shouldFetch]);

	useEffect(() => {
		if (!transaction.length || !categories.length) return;

		const expenseMap = new Map<string, number>();

		transaction
			.filter((x) => x.type === 'expense')
			.forEach((x) => {
				const categoryName = categories.find((cat) => cat.id === x.id_category)?.name || 'Sem categoria';
				expenseMap.set(categoryName, (expenseMap.get(categoryName) || 0) + x.value);
			});

		const formattedData = Array.from(expenseMap, ([name, value]) => ({ name, value }));
		setChartData(formattedData);
	}, [transaction, categories]);

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

	return (
		<div className={styles.pieChartContainer}>
			<PieChart width={400} height={400}>
				<Pie data={chartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</div>
	);
};
