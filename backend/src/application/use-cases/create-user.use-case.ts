import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	public async createUser(name: string, password: string): Promise<User> {
		const user = User.createUser(name, password);
		return await this.userRepository.createUser(user);
	}
}
