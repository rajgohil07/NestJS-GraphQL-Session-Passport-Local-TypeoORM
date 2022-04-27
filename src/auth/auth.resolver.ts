import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/createinput';
import { GQLAuthGuard } from './gql-authguard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  @UseGuards(GQLAuthGuard)
  login(@Args('LoginInput') loginInput: LoginInput, @Context() context: any) {
    console.log(context, 'here\n\n\n');
    console.log(context.user, 'here\n\n\n');
    // return context.req.user;
    return this.authService.login(loginInput);
  }
}
