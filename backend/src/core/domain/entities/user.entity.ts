import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserDto } from '../../application/dto/user.dto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
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

	public static fromDto(createUserDto: CreateUserDto): User {
		return new User(createUserDto.name, createUserDto.password);
	}

	public static entityToDto(user: User): UserDto {
		return new UserDto(user.id, user.name, user.created_at);
	}
}
