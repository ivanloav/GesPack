import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; accessToken?: string; user?: any }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.userPassword === password) {
      const payload = { email: user.email, sub: user.userId };
      const accessToken = this.jwtService.sign(payload);
      return { success: true, accessToken, user };
    } else {
      return { success: false };
    }
  }
}
