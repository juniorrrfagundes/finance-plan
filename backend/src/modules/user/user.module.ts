// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UserRepositoryPg } from '../../infrastructure/database/user.repository.pg';
import { PgConnection } from '../../infrastructure/database/pg-connection';
import { UserController } from '../../infrastructure/controllers/user.controller';
import { UserRepository } from '../../domain/repositories/user.repository';

@Module({
	providers: [
		PgConnection,
		{
			provide: UserRepository,
			useClass: UserRepositoryPg,
		},
		CreateUserUseCase,
	],
	exports: [CreateUserUseCase],
	controllers: [UserController],
})
export class UserModule {}
