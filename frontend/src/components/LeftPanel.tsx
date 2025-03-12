import React from 'react';
import styles from './LeftPanel.module.css';
import { PanelButton } from './Buttons/PanelButton';

export const LeftPanel: React.FC = () => {
	const invested = 468.345;
	const balance = 800;

	return (
		<div className={styles.sidebar}>
			<h2 className={styles.sidebarTitle}>Menu</h2>

			<div className={styles.container}>
				<div className={styles.info}>
					<p className={styles.label}>Invested:</p>
					<p className={styles.value}>$ {invested}</p>
				</div>
				<div className={styles.info}>
					<p className={styles.label}>Balance:</p>
					<p className={styles.value}>$ {balance}</p>
				</div>
			</div>
			<div className={styles.sidebarMenu}>
				<PanelButton url="dashboard" text="Dashboard" />
				<PanelButton url="transactions" text="Transactions" />
				<PanelButton url="categories" text="Categories" />
			</div>
		</div>
	);
};
