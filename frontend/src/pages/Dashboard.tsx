import React, { useState } from 'react';
import { Header } from '../components/Header';
import { LeftPanel } from '../components/LeftPanel';
import styles from './Dashboard.module.css';
import { PizzaChart } from '../components/pizzaChart';

export const Dashboard: React.FC = () => {
	const token = localStorage.getItem('access_token');
	const [shouldFetch, setShouldFetch] = useState(false);

	return (
		<div className={styles.dashboardContainer}>
			<Header />
			<div className={styles.mainContent}>
				<LeftPanel setShouldFetch={setShouldFetch} shouldFetch={shouldFetch} />
				<div className={styles.content}>
					<h1>Dashboard</h1>
					<p>Este é o conteúdo da página principal.</p>
					<PizzaChart />
				</div>
			</div>
		</div>
	);
};
