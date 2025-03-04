import { Controller, Post, Body, Delete } from '@nestjs/common';
import { CreateCategoryUseCase, DeleteCategoryUseCase } from '../core/application/use-cases/category.use-case';
import { CreateCategoryDto, DeleteCategoryDto } from '../core/application/dto/category.dto';

@Controller('categories')
export class CategoryController {
	constructor(private readonly createCategory: CreateCategoryUseCase, private readonly deleteCategory: DeleteCategoryUseCase) {}

	@Post()
	public async create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.createCategory.createCategory(createCategoryDto.name, createCategoryDto.id_user);
	}

	@Delete()
	public async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
		return this.deleteCategory.deleteCategory(deleteCategoryDto.id, deleteCategoryDto.id_user);
	}
}
