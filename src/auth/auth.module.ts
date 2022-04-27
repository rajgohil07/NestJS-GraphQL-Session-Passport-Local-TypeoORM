import { Module } from '@nestjs/common';
import { LocalStrategy } from './passport.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';

@Module({
  exports: [LocalStrategy],
  imports: [PassportModule, UserModule],
  providers: [LocalStrategy, AuthService, AuthResolver],
})
export class AuthModule {}
