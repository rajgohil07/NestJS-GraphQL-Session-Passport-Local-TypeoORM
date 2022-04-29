import { Module } from '@nestjs/common';
import { LocalStrategy } from './passport.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { SessionSerializer } from './guard/session.serializer.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  exports: [LocalStrategy],
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [LocalStrategy, AuthService, AuthResolver, SessionSerializer],
})
export class AuthModule {}
