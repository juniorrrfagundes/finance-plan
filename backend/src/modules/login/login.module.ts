import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { LoginRepository } from '../../core/domain/repositories/login.repository';
import { LoginRepositoryOrm } from '../../infrastructure/database/login.repository.orm';
import { LoginUseCase } from '../../core/application/use-cases/login.use-case';
import { LoginController } from '../../controller/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
			provide: LoginRepository,
			useClass: LoginRepositoryOrm,
		},
		LoginUseCase,
	],
	exports: [LoginUseCase],
	controllers: [LoginController],
})
export class LoginModule {}
