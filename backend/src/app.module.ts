// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './core/domain/entities/user.entity';
import { UserRepositoryPg } from './infrastructure/database/user.repository.pg';

@Module({
	imports: [
		UserModule,
		CategoryModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost', // for docker use postgres, for local use localhost
			port: 5432,
			username: 'postgres',
			password: 'admin',
			database: 'finance',
			entities: [User],
			synchronize: false,
		}),
		TypeOrmModule.forFeature([UserRepositoryPg]),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
