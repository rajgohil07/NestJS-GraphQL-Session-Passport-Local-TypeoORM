import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { constant } from 'src/common/constant';
import { User } from 'src/custom.decoder/user.decoder';
import { UserEntity } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/createinput';
import { LoginResponse } from './dto/login.response';
import { GQLAuthGuard } from './guard/gql-authguard';
import { SessionLocalAuthGuard } from './guard/session.auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  @UseGuards(GQLAuthGuard, SessionLocalAuthGuard)
  login(
    @Args('LoginInput') loginInput: LoginInput,
    @User() user: UserEntity,
  ): LoginResponse {
    return {
      LoginSuccessMessage: constant.LOGIN_SUCCESSFUL,
      CurrentUser: user,
    };
  }
}
