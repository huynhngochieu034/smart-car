import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTModule } from 'src/jwt.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JWTModule,
    UsersModule
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
