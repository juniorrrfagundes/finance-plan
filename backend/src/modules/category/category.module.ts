import { Module } from '@nestjs/common';
import { CreateCategoryUseCase, DeleteCategoryUseCase } from '../../application/use-cases/category.use-case';
import { CategoryRepositoryPg } from '../../infrastructure/database/category.repository.pg';
import { PgConnection } from '../../infrastructure/database/pg-connection';
import { CategoryController } from '../../infrastructure/controllers/category.controller';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Module({
	providers: [
		PgConnection,
		{
			provide: CategoryRepository,
			useClass: CategoryRepositoryPg,
		},
		CreateCategoryUseCase,
		DeleteCategoryUseCase,
	],
	exports: [CreateCategoryUseCase, DeleteCategoryUseCase],
	controllers: [CategoryController],
})
export class CategoryModule {}
