// src/pages/Dashboard.tsx
import React from 'react';
import { Header } from '../components/Header';
import { LeftPanel } from '../components/LeftPanel';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
	const token = localStorage.getItem('access_token');

	return (
		<div className={styles.dashboardContainer}>
			<Header />
			<div className={styles.mainContent}>
				<LeftPanel />
				<div className={styles.content}>
					<h1>Bem-vindo ao Dashboard!</h1>
					<p>Este é o conteúdo da página principal.</p>
				</div>
			</div>
		</div>
	);
};
