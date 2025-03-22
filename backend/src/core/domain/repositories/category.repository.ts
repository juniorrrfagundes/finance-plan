import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { CategoryDto } from '../../application/dto/category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export abstract class CategoryRepository {
	public abstract createCategory(category: CreateCategoryDto): Promise<CategoryDto>;

	public abstract deleteCategoryById(id: number): Promise<DeleteResult>;

	public abstract findOneById(id: number): Promise<CategoryDto | null>;

	public abstract updateCategoryById(id: number, name: string): Promise<UpdateResult>;

	public abstract findByUserId(id: number): Promise<CategoryDto[] | null>;

	public abstract findByCategoryName(name: string): Promise<CategoryDto | null>;
}
