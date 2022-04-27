import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  // user login functionality
  @Query(() => UserEntity)
  userLogin(
    @Args('Email') Email: string,
    @Args('Password') Password: string,
  ): Promise<UserEntity> {
    return this.userService.userLogin({ Email, Password });
  }
}
