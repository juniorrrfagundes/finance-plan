import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../core/domain/repositories/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../core/domain/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../../core/application/dto/create-category.dto';
import { CategoryDto } from '../../core/application/dto/category.dto';

@Injectable()
export class CategoryRepositoryOrm implements CategoryRepository {
	constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

	public async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
		const categoryEntity = Category.createDtoToEntity(createCategoryDto);
		const savedCategory = await this.categoryRepository.save(categoryEntity);
		const categoryDto = Category.entityToDto(savedCategory);
		return categoryDto;
	}
}
