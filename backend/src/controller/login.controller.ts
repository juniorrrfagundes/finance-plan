import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../core/application/dto/login.dto';
import { LoginUseCase } from '../core/application/use-cases/login.use-case';

@Controller('login')
export class LoginController {
	constructor(private readonly loginUseCase: LoginUseCase) {}

	@Post()
	public async login(@Body() loginDto: LoginDto) {
		return this.loginUseCase.login(loginDto);
	}
}
