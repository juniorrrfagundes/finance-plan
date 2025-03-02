import { Controller, Post, Body } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/category.use-case';
import { CreateCategoryDto } from '../../application/dto/category.dto';

@Controller('categories')
export class CategoryController {
	constructor(private readonly createCategory: CreateCategoryUseCase) {}

	@Post()
	public async create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.createCategory.CreateCategory(
			createCategoryDto.name,
			createCategoryDto.id_user,
		);
	}
}
