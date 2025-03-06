import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CreateCategoryUseCase {
	constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

	public async createCategory(createCategoryDto: CreateCategoryDto, id_user: number): Promise<CategoryDto> {
		createCategoryDto.id_user = id_user;
		return await this.categoryRepository.createCategory(createCategoryDto);
	}
}
