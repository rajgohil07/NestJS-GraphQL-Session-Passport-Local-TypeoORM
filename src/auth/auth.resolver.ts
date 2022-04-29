import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/custom.decoder/user.decoder';
import { UserEntity } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/createinput';
import { GQLAuthGuard } from './guard/gql-authguard';
import { SessionLocalAuthGuard } from './guard/session.auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity)
  @UseGuards(GQLAuthGuard, SessionLocalAuthGuard)
  login(@Args('LoginInput') loginInput: LoginInput, @User() user: UserEntity) {
    return user;
  }
}
