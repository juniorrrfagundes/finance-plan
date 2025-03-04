import { CreateUserDto } from '../../application/dto/create-user.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { UserDto } from '../../application/dto/user.dto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class LoginEntity {
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column()
	public name!: string;

	@Column()
	public password!: string;

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	public created_at!: Date;

	constructor(name?: string, password?: string) {
		if (name && password) {
			this.name = name;
			this.password = password;
		}
	}

	public static entityToDto(user: LoginEntity): UserDto {
		return new UserDto(user.id, user.name, user.password, user.created_at);
	}

	public static dtoToEntity(loginDto: LoginDto): LoginEntity {
		return new LoginEntity(loginDto.name, loginDto.password);
	}
}
