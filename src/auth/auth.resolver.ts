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
    // @Context('session') session: any,
    @Context() { req }: any,
  ) {
    // console.log(user, 'user\n\n\n');
    // console.log(contextAll.req.body.user, 'here\n\n\n');
    const { user, session } = req;
    console.log(user, 'here\n\n\n');
    console.log(session, 'session\n\n\n');
    return user;
    // return this.authService.login(loginInput);
  }

  @Query(() => UserEntity)
  ActiveUser(@Context() Context: any) {
    console.log(Context, 'Context.req.user\n\n\n');
    console.log(Context.req.user, 'Context.req.user\n\n\n');
    // console.log(Context.req.session, 'Context.req.user\n\n\n');
    // console.log(Context.user, 'Context.req.user\n\n\n');
    return Context.req.user;
    // return this.authService.login(loginInput);
  }
}
