import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
	public abstract createCategory(category: Category): Promise<Category>;

	public abstract deleteCategory(category: Category): Promise<Category>;
}
