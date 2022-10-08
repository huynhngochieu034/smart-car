import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    this.logger.log(
      `Request to register with user name: ${registerDto.username}`,
    );
    registerDto.password = await this.hashPassword(registerDto.password);
    await this.usersService.register(registerDto);
    return 'Registered successfully';
  }

  async login(loginDto: LoginDto) {
    this.logger.log(`Request to login with email: ${loginDto.username}`);

    const user = await this.usersService.findOne({
      username: loginDto.username,
    });

    const match = await this.comparePassword(loginDto.password, user.password);
    if (!match)
      throw new HttpException(
        'Password is not correct',
        HttpStatus.BAD_REQUEST,
      );

    return this.generateToken(user);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, storePasswordHash: string) {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async generateToken(user: User) {
    const roles = user.roles.map((item) => item.code);
    const access_token = this.jwtService.sign({
      username: user.username,
      roles,
    });
    return { access_token };
  }
}
