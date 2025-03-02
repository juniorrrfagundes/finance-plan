import { Injectable } from '@nestjs/common';
import { PgConnection } from './pg-connection';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class CategoryRepositoryPg extends CategoryRepository {
	constructor(private readonly pg: PgConnection) {
		super();
	}

	public async createCategory(category: Category): Promise<Category> {
		const query = ` INSERT INTO categories (name, id_user) VALUES ($1, $2) RETURNING *; `;
		const result = await this.pg.query(query, [category.name, category.id_user]);
		return result[0];
	}
}
