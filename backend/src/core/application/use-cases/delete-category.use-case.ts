import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
	constructor(@Inject(CategoryRepository) private readonly deleteCategoryRepository: CategoryRepository) {}

	public async deleteCategory(id: number, id_user: number): Promise<void> {
		const existCategory = await this.deleteCategoryRepository.findOneById(id);
		if (!existCategory) throw new NotFoundException('Categoria não encontrada.');
		if (existCategory.id_user != id_user) throw new ForbiddenException('Acesso negado: você não tem permissão para esta categoria.');
		this.deleteCategoryRepository.deleteCategoryById(existCategory.id);
	}
}
