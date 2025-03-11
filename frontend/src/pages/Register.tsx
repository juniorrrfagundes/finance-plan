import React from 'react';
import styles from './Home.module.css';
import { Header } from '../components/Header';
import { Singup } from '../components/Singup';

export const Register: React.FC = () => {
	return (
		<div className={styles.container}>
			<Header />
			<Singup />
		</div>
	);
};
