import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../../core/application/auth/jwt.auth.guard';
import { JwtStrategy } from '../../core/application/auth/jwt.validate';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
			}),
		}),
	],
	providers: [JwtAuthGuard, JwtStrategy],
	exports: [JwtStrategy],
})
export class AuthModule {}
