import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	public async createCategory(name: string, id_user: number) {
		const category = Category.createCategory(name, id_user);
		return await this.categoryRepository.createCategory(category);
	}
}

@Injectable()
export class DeleteCategoryUseCase {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	public async deleteCategory(id: number, id_user: number) {
		const category = Category.deleteCategory(id, id_user);
		return await this.categoryRepository.deleteCategory(category);
	}
}
