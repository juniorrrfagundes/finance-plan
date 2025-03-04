import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../core/application/use-cases/createUser.use-case';
import { CreateUserDto } from '../core/application/dto/create-user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	public async create(@Body() createUserDto: CreateUserDto) {
		return this.createUserUseCase.createUser(createUserDto);
	}
}
