// src/components/Header.tsx
import React from 'react';
import styles from './Header.module.css';
import { DollarIcon } from '../assets/DollarIcom';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
	const navigate = useNavigate();
	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<DollarIcon />
				<h1 className={styles.logo}>Controle de Finanças</h1>
			</div>
			<nav className={styles.nav}>
				<button className={styles.button} onClick={() => navigate('/home')}>
					Login
				</button>
				<button className={styles.buttonSignup} onClick={() => navigate('/register')}>
					Signup
				</button>
			</nav>
		</header>
	);
};
