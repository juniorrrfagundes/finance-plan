import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
	constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

	public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
		createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
		return this.userRepository.createUser(createUserDto);
	}
}
