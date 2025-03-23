import React, { useState } from 'react';
import { Header } from '../components/Header';
import { LeftPanel } from '../components/LeftPanel';
import styles from './Categories.module.css';
import { CreateButtonCategories } from '../components/Buttons/CreateButtonCategories';
import { CategoriesList } from '../components/CategoriesList';

export const Categories: React.FC = () => {
	const token = localStorage.getItem('access_token');

	return (
		<div className={styles.categoriesContainer}>
			<Header />
			<div className={styles.mainContent}>
				<div className={styles.leftPanel}>
					<LeftPanel />
				</div>
				<div className={styles.content}>
					<h1>Categories</h1>
					<div className={styles.createButton}>
						<CreateButtonCategories />
					</div>
					<div>
						<CategoriesList />
					</div>
				</div>
			</div>
		</div>
	);
};
