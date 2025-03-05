import { Controller, Post, Body, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateCategoryUseCase, DeleteCategoryUseCase } from '../core/application/use-cases/category.use-case';
import { CreateCategoryDto, DeleteCategoryDto } from '../core/application/dto/category.dto';
import { JwtAuthGuard } from '../core/application/auth/jwt.auth.guard';
import { IRequest } from '../core/application/interface/request.interface';

@Controller('categories')
export class CategoryController {
	constructor(private readonly createCategory: CreateCategoryUseCase, private readonly deleteCategory: DeleteCategoryUseCase) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	public async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.createCategory.createCategory(createCategoryDto.name, userId);
	}

	@Delete()
	public async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
		return this.deleteCategory.deleteCategory(deleteCategoryDto.id, deleteCategoryDto.id_user);
	}
}
