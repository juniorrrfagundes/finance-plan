import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Singup.module.css';

export const Singup: React.FC = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');

		try {
			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, password }),
			});
			if (response.ok) {
				navigate('/home');
			}
		} catch (err) {
			setError('Error connecting to server');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2>Register new user</h2>
				{error && <p className={styles.error}>{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label>Name</label>
						<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Write your name" required />
					</div>
					<div className={styles.inputGroup}>
						<label>Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Write your password"
							required
						/>
					</div>
					<button type="submit" className={styles.button}>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};
