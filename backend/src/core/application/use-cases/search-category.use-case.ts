import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class SearchCategoryUseCase {
	constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

	public async searchCategory(id_user: number): Promise<CategoryDto[] | null> {
		return await this.categoryRepository.findByUserId(id_user);
	}

	public async searchCategoryById(id: number, id_user: number): Promise<null | CategoryDto> {
		const category = await this.categoryRepository.findOneById(id);
		if (!category) throw new NotFoundException('Categoria não encontrada.');
		if (category.id_user != id_user) throw new ForbiddenException('Acesso negado: você não tem permissão para esta categoria.');
		return category;
	}
}
