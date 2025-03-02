import { User } from '../entities/user.entity';

export abstract class UserRepository {
	public abstract createUser(user: User): Promise<User>;
}
