import { Inject, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';
import { LoginRepository } from '../../domain/repositories/login.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
	constructor(
		@Inject(LoginRepository) private readonly loginRepository: LoginRepository,
		private readonly jwtService: JwtService,
	) {}

	public async login(loginDto: LoginDto): Promise<{ acess_token: string }> {
		const userDto = await this.loginRepository.findByName(loginDto);
		if (!userDto) throw new NotFoundException('Usuário inválido'); // throw 404
		const match = await bcrypt.compare(loginDto.password, userDto.password);
		if (!match) throw new UnauthorizedException('Credenciais inválidas'); // throw 401
		const payload = { userId: userDto.id, username: userDto.name };
		return { acess_token: this.jwtService.sign(payload) };
	}
}
