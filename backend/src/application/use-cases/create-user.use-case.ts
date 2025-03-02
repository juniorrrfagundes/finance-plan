import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	public async execute(name: string, password: string): Promise<User> {
		const user = User.create(name, password);
		return await this.userRepository.create(user);
	}
}
