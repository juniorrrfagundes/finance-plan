import React, { useState } from 'react';
import { Header } from '../components/Header';
import { LeftPanel } from '../components/LeftPanel';
import styles from './transactions.module.css';
import { TransactionsList } from '../components/TransactionsList';
import { CreateButtonTransactions } from '../components/Buttons/CreateButtonTransactions';

export const Transactions: React.FC = () => {
	const [shouldFetch, setShouldFetch] = useState(false);
	const token = localStorage.getItem('access_token');

	return (
		<div className={styles.categoriesContainer}>
			<Header />
			<div className={styles.mainContent}>
				<div className={styles.leftPanel}>
					<LeftPanel setShouldFetch={setShouldFetch} shouldFetch={shouldFetch} />
				</div>
				<div className={styles.content}>
					<h1>Transactions</h1>
					<div className={styles.createButton}>
						<CreateButtonTransactions setShouldFetch={setShouldFetch} />
					</div>
					<div>
						<TransactionsList setShouldFetch={setShouldFetch} shouldFetch={shouldFetch} />
					</div>
				</div>
			</div>
		</div>
	);
};
