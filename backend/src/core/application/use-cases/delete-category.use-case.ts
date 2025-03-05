import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DeleteCategoryUseCase {
	constructor(@Inject(CategoryRepository) private readonly deleteCategoryRepository: CategoryRepository) {}

	public async deleteCategory(id: number, id_user: number): Promise<DeleteResult | null> {
		const categoryDto = new CategoryDto(id, null, null, null, id_user);
		const existCategory = await this.deleteCategoryRepository.findOneBy(categoryDto);
		if (!existCategory) return null;
		return this.deleteCategoryRepository.deleteCategory(categoryDto);
	}
}
