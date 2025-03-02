import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	public async create(@Body() createUserDto: CreateUserDto) {
		return this.createUserUseCase.createUser(createUserDto.name, createUserDto.password);
	}
}
