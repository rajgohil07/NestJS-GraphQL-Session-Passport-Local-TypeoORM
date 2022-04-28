import { Module } from '@nestjs/common';
import { LocalStrategy } from './passport.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { SessionSerializer } from './session.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  exports: [LocalStrategy],
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity]), UserModule],
  providers: [LocalStrategy, AuthService, AuthResolver, SessionSerializer],
})
export class AuthModule {}
