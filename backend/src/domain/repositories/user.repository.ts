import { User } from '../entities/user.entity';

export abstract class UserRepository {
	public abstract create(user: User): Promise<User>;
}
