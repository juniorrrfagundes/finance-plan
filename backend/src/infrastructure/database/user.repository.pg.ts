import { Injectable } from '@nestjs/common';
import { PgConnection } from './pg-connection';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryPg extends UserRepository {
	constructor(private readonly pg: PgConnection) {
		super();
	}

	public async createUser(user: User): Promise<User> {
		const query = ` INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *; `;
		const result = await this.pg.query(query, [user.name, user.password]);
		return result[0];
	}
}
