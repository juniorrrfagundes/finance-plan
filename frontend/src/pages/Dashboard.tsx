import { Header } from '../components/Header';

export const Dashboard: React.FC = () => {
	const token = localStorage.getItem('access_token');

	return (
		<>
			<Header />
			<div>Dashboard</div>
			<div>{token}</div>
		</>
	);
};
