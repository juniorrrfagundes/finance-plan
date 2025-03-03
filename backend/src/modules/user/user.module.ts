import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../../core/application/use-cases/create-user.use-case';
import { UserRepositoryPg } from '../../infrastructure/database/user.repository.pg';
import { PgConnection } from '../../infrastructure/database/pg-connection';
import { UserController } from '../../controller/user.controller';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [
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
