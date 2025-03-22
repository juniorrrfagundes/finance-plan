import React from 'react';
import { Header } from '../components/Header';
import { LeftPanel } from '../components/LeftPanel';
import styles from './Categories.module.css';
import { CreateButtonCategories } from '../components/Buttons/CreateButtonCategories';

export const Categories: React.FC = () => {
	const token = localStorage.getItem('access_token');

	return (
		<div className={styles.categoriesContainer}>
			<Header />
			<div className={styles.mainContent}>
				<LeftPanel />
				<div className={styles.content}>
					<h1>Categories</h1>
					<div className={styles.createButton}>
						<CreateButtonCategories />
					</div>
					{/* lista */}
					<div></div>
				</div>
			</div>
		</div>
	);
};
