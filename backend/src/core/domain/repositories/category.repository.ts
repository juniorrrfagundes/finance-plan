import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { CategoryDto } from '../../application/dto/category.dto';

export abstract class CategoryRepository {
	public abstract createCategory(category: CreateCategoryDto): Promise<CategoryDto>;

	// public abstract deleteCategory(category: Category): Promise<Category>;
}
