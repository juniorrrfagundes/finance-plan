import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../core/domain/repositories/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../core/domain/entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
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

	public async deleteCategory(deleteCategoryDto: CategoryDto): Promise<DeleteResult> {
		const result = await this.categoryRepository.softDelete({ id: deleteCategoryDto.id, id_user: deleteCategoryDto.id_user });
		return result;
	}

	public async findOneBy(findCategoryDto: CategoryDto): Promise<CategoryDto | null> {
		const isExist = await this.categoryRepository.findOneBy({ id: findCategoryDto.id, id_user: findCategoryDto.id_user });
		if (!isExist) return null;
		const categoryDto = Category.entityToDto(isExist);
		return categoryDto;
	}
}
