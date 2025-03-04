import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserDto } from '../../application/dto/user.dto';

export abstract class UserRepository {
	public abstract createUser(createUserDto: CreateUserDto): Promise<UserDto>;

	public abstract findByName(createUserDto: CreateUserDto): Promise<UserDto | null>;
}
