// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { DollarIcon } from '../assets/DollarIcom';
import { LogoutButton } from './Buttons/LogoutButton';
import { LoginButton } from './Buttons/LoginButton';
import { SingupButton } from './Buttons/SingupButton';

export const Header: React.FC = () => {
	const [isLogged, setIsLogged] = useState<Boolean>(!!localStorage.getItem('access_token'));

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'access_token') {
				setIsLogged(!!event.newValue);
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<DollarIcon />
				<h1 className={styles.logo}>Finance Control</h1>
			</div>
			<nav className={styles.nav}>
				{isLogged ? (
					<LogoutButton />
				) : (
					<>
						<LoginButton />
						<SingupButton />
					</>
				)}
			</nav>
		</header>
	);
};
