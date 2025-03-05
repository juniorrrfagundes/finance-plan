import { Injectable } from '@nestjs/common';
import { LoginRepository } from '../../core/domain/repositories/login.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../../core/application/dto/login.dto';
import { UserDto } from '../../core/application/dto/user.dto';
import { LoginEntity } from '../../core/domain/entities/login.entity';

@Injectable()
export class LoginRepositoryOrm implements LoginRepository {
	constructor(
		@InjectRepository(LoginEntity)
		private readonly loginRepository: Repository<LoginEntity>,
	) {}

	public async findByName(user: LoginDto): Promise<UserDto | null> {
		const userEntity = LoginEntity.dtoToEntity(user);
		const result = await this.loginRepository.findOneBy({ name: userEntity.name });
		if (!result) return null;
		const userDto = LoginEntity.entityToDto(result);
		return userDto;
	}
}
