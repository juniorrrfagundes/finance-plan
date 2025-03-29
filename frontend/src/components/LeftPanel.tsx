import React, { useState, useEffect } from 'react';
import styles from './LeftPanel.module.css';
import { PanelButton } from './Buttons/PanelButton';

interface fetch {
	setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
	shouldFetch: boolean;
}

export const LeftPanel: React.FC<fetch> = ({ setShouldFetch, shouldFetch }) => {
	const [invested, setInvested] = useState<number>(0);
	const [balance, setBalance] = useState<number>(0);

	const access_token = localStorage.getItem('access_token');

	const getBalanceInvestiment = async () => {
		try {
			const response = await fetch('http://localhost:3000/transactions/balance-investiment', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${access_token}`,
				},
			});
			const data = await response.json();
			setShouldFetch((prev) => !prev);

			setInvested(data.invested);
			setBalance(data.balance);
		} catch (error) {
			console.error('Erro ao buscar dados:', error);
		}
	};

	useEffect(() => {
		getBalanceInvestiment();
	}, [shouldFetch]);

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
