import { Injectable } from '@nestjs/common';
import { PgConnection } from './pg-connection';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { UserDto } from '../../core/application/dto/user.dto';
import { CreateUserDto } from '../../core/application/dto/create-user.dto';
import { User } from '../../core/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryPg implements UserRepository {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
		const userEntity = User.fromDto(createUserDto);
		const savedUser = await this.userRepository.save(userEntity);
		const userDto = User.entityToDto(savedUser);
		return userDto;
	}
}
