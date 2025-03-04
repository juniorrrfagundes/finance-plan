import { LoginDto } from '../../application/dto/login.dto';
import { UserDto } from '../../application/dto/user.dto';

export abstract class LoginRepository {
	public abstract findByName(user: LoginDto): Promise<UserDto | null>;
}
