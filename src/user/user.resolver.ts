import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/custom.decoder/user.decoder';
import { UserEntity } from 'src/entity/user.entity';
import { CheckConnectionDTO } from './dto/checkConnectionDTO';
import { CreateUser } from './dto/createUser';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // to check the connection
  @Query(() => CheckConnectionDTO)
  checkServer(): CheckConnectionDTO {
    return { connectionStatus: 'connected with graphql' };
  }

  // user register functionality
  @Mutation(() => UserEntity)
  createUser(
    @Args('UserCreateObject') userCreateObject: CreateUser,
  ): Promise<UserEntity> {
    return this.userService.createUser(userCreateObject);
  }

  @Query(() => UserEntity)
  ActiveUser(@User() user: UserEntity) {
    console.log(user, 'user.req.user\n\n\n');
    return user;
  }
}
