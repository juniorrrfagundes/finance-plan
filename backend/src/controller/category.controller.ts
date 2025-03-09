import { Controller, Post, Body, Delete, UseGuards, Request, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { CreateCategoryUseCase } from '../core/application/use-cases/create-category.use-case';
import { CreateCategoryDto } from '../core/application/dto/create-category.dto';
import { JwtAuthGuard } from '../core/application/auth/jwt.auth.guard';
import { IRequest } from '../core/application/interface/request.interface';
import { DeleteCategoryUseCase } from '../core/application/use-cases/delete-category.use-case';
import { UpdateCategoryDto } from '../core/application/dto/update-category.dto';
import { UpdateCategoryUseCase } from '../core/application/use-cases/update-category.use-case';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
	constructor(
		private readonly createCategory: CreateCategoryUseCase,
		private readonly deleteCategory: DeleteCategoryUseCase,
		private readonly updateCategory: UpdateCategoryUseCase,
	) {}

	@Post()
	public async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.createCategory.createCategory(createCategoryDto, userId);
	}

	@Delete(':id')
	public async delete(@Param('id', ParseIntPipe) id: number, @Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.deleteCategory.deleteCategory(id, userId);
	}

	@Patch(':id')
	public async update(@Param('id', ParseIntPipe) id: number, @Request() req: IRequest, @Body() updateCategoryDto: UpdateCategoryDto) {
		const userId = req.user.id_user;
		return this.updateCategory.updateCategory(id, userId, updateCategoryDto);
	}
}
