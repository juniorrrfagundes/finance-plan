import React from 'react';
import styles from './Home.module.css';
import { Header } from '../components/Header';
import { Login } from '../components/Login';

export const Home: React.FC = () => {
	return (
		<div className={styles.container}>
			<Header />
			<Login />
		</div>
	);
};
