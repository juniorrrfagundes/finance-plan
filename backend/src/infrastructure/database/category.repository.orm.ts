import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../core/domain/repositories/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../core/domain/entities/category.entity';
import { DeleteResult, Repository, UpdateResult, IsNull } from 'typeorm';
import { CreateCategoryDto } from '../../core/application/dto/create-category.dto';
import { CategoryDto } from '../../core/application/dto/category.dto';

@Injectable()
export class CategoryRepositoryOrm implements CategoryRepository {
	constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

	public async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
		const categoryEntity = Category.createDtoToEntity(createCategoryDto);
		const savedCategory = await this.categoryRepository.save(categoryEntity);
		return Category.entityToDto(savedCategory);
	}

	public async deleteCategoryById(id: number): Promise<DeleteResult> {
		return this.categoryRepository.softDelete({ id: id });
	}

	public async findOneById(id: number): Promise<CategoryDto | null> {
		const categories = await this.categoryRepository.findOneBy({ id: id });
		if (!categories) return null;
		return Category.entityToDto(categories);
	}

	public async updateCategoryById(id: number, name: string): Promise<UpdateResult> {
		return this.categoryRepository.update(id, { name: name });
	}

	public async findByUserId(id: number): Promise<CategoryDto[] | null> {
		const categories = await this.categoryRepository.find({ where: { id_user: id, delete_at: IsNull() } });
		if (!categories.length) return null;
		return categories.map(Category.entityToDto);
	}

	public async findByCategoryName(name: string): Promise<CategoryDto | null> {
		const categories = await this.categoryRepository.findOneBy({ name: name });
		if (!categories) return null;
		return Category.entityToDto(categories);
	}
}
