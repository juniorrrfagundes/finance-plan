import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
	constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

	public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
		if (!createUserDto.name || !createUserDto.password)
			throw new BadRequestException('Usuário ou Senha inválidos');
		const existUser = await this.userRepository.findByName(createUserDto);
		if (existUser) throw new BadRequestException('Nome de usuário já existente');
		createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
		return this.userRepository.createUser(createUserDto);
	}
}
