import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CreateCategoryUseCase {
	constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

	public async createCategory(createCategoryDto: CreateCategoryDto, id_user: number): Promise<CategoryDto> {
		createCategoryDto.id_user = id_user;
		if (!createCategoryDto.name || createCategoryDto.name == '') throw new BadRequestException('Nome de categoria inválida');
		const existCategory = await this.categoryRepository.findByCategoryName(createCategoryDto.name);
		if (existCategory) throw new BadRequestException('Nome de categoria já existente');
		return await this.categoryRepository.createCategory(createCategoryDto);
	}
}
