import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/createinput';
import { GQLAuthGuard } from './gql-authguard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity)
  @UseGuards(GQLAuthGuard)
  login(
    @Args('LoginInput') loginInput: LoginInput,
    @Context('session') { user }: any,
    @Context() contextAll: any,
  ) {
    // console.log(user, 'user\n\n\n');
    // console.log(contextAll.req.body.user, 'here\n\n\n');
    // console.log(contextAll.req, 'here\n\n\n');
    return user;
    // return this.authService.login(loginInput);
  }
}
