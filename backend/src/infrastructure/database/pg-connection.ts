import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PgConnection {
	private pool: Pool;

	constructor() {
		this.pool = new Pool({
			host: 'postgres',
			port: 5432,
			user: 'postgres',
			password: 'admin',
			database: 'finance',
		});
	}

	public async query(queryText: string, params?: any[]) {
		const client = await this.pool.connect();
		try {
			const res = await client.query(queryText, params);
			return res.rows;
		} finally {
			client.release();
		}
	}
}
