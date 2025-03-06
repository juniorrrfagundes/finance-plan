import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { CategoryDto } from '../../application/dto/category.dto';
import { DeleteResult } from 'typeorm';

export abstract class CategoryRepository {
	public abstract createCategory(category: CreateCategoryDto): Promise<CategoryDto>;

	public abstract deleteCategoryById(id: number): Promise<DeleteResult>;

	public abstract findOneById(id: number): Promise<CategoryDto | null>;
}
