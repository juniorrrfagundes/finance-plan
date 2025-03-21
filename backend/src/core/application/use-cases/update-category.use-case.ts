import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../../domain/entities/category.entity';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class UpdateCategoryUseCase {
	constructor(@Inject(CategoryRepository) private readonly updateCategoryRepository: CategoryRepository) {}

	public async updateCategory(id: number, id_user: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto | null> {
		const existCategory = await this.updateCategoryRepository.findOneById(id);
		if (!existCategory) throw new NotFoundException('Categoria não encontrada.');
		if (existCategory.id_user != id_user) throw new ForbiddenException('Acesso negado: você não tem permissão para esta categoria.');
		await this.updateCategoryRepository.updateCategoryById(existCategory.id, updateCategoryDto.name);
		return this.updateCategoryRepository.findOneById(existCategory.id);
	}
}
