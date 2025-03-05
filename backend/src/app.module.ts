// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './core/domain/entities/user.entity';
import { UserRepositoryOrm } from './infrastructure/database/user.repository.orm';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './modules/login/login.module';
import { LoginRepositoryOrm } from './infrastructure/database/login.repository.orm';
import { AuthModule } from './modules/auth/auth.module';
import { Category } from './core/domain/entities/category.entity';
import { LoginEntity } from './core/domain/entities/login.entity';

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
			entities: [User, LoginEntity, Category],
			synchronize: false,
		}),
		TypeOrmModule.forFeature([UserRepositoryOrm, LoginRepositoryOrm]),
		LoginModule,
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
