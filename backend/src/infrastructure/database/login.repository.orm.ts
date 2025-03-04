import { Injectable } from '@nestjs/common';
import { LoginRepository } from '../../core/domain/repositories/login.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../../core/application/dto/login.dto';
import { UserDto } from '../../core/application/dto/user.dto';

@Injectable()
export class LoginRepositoryOrm implements LoginRepository {
	constructor(
		@InjectRepository(User)
		private readonly loginRepository: Repository<User>,
	) {}

	public async findByName(user: LoginDto): Promise<UserDto | null> {
		const userEntity = User.fromLoginDto(user);
		const result = await this.loginRepository.findOneBy({ name: userEntity.name });
		if (!result) return null;
		const userDto = User.entityToDto(result);
		return userDto;
	}
}
