import { Inject, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class LoginUseCase {
	constructor(@Inject(UserRepository) private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

	public async login(loginDto: LoginDto): Promise<{ access_token: string }> {
		const userDto = await this.userRepository.findByName(loginDto.name);
		if (!userDto) throw new NotFoundException('Usuário inválido'); // throw 404
		const match = await bcrypt.compare(loginDto.password, userDto.password);
		if (!match) throw new UnauthorizedException('Credenciais inválidas'); // throw 401
		const payload = { id_user: userDto.id };
		return { access_token: this.jwtService.sign(payload) };
	}
}
