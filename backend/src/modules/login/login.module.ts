import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUseCase } from '../../core/application/use-cases/login.use-case';
import { LoginController } from '../../controller/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../core/domain/entities/user.entity';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { UserRepositoryOrm } from '../../infrastructure/database/user.repository.orm';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
	],
	providers: [
		{
			provide: UserRepository,
			useClass: UserRepositoryOrm,
		},
		LoginUseCase,
	],
	exports: [LoginUseCase],
	controllers: [LoginController],
})
export class LoginModule {}
