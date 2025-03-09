import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../core/application/use-cases/create-category.use-case';
import { PgConnection } from '../../infrastructure/database/pg-connection';
import { CategoryController } from '../../controller/category.controller';
import { CategoryRepository } from '../../core/domain/repositories/category.repository';
import { CategoryRepositoryOrm } from '../../infrastructure/database/category.repository.orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../core/domain/entities/category.entity';
import { DeleteCategoryUseCase } from '../../core/application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from '../../core/application/use-cases/update-category.use-case';
import { SearchCategoryUseCase } from '../../core/application/use-cases/search-category.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [
		{
			provide: CategoryRepository,
			useClass: CategoryRepositoryOrm,
		},
		CreateCategoryUseCase,
		DeleteCategoryUseCase,
		UpdateCategoryUseCase,
		SearchCategoryUseCase,
	],
	exports: [CreateCategoryUseCase, DeleteCategoryUseCase, UpdateCategoryUseCase],
	controllers: [CategoryController],
})
export class CategoryModule {}
