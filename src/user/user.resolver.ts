import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsAuthenticated } from 'src/auth/guard/check.authentication.guard';
import { User } from 'src/custom.decoder/user.decoder';
import { UserEntity } from 'src/entity/user.entity';
import { CheckConnectionDTO } from './dto/checkConnectionDTO';
import { CreateUser } from './dto/createUser';
import { UserService } from './user.service';
import { AllUserResponseDTO } from './dto/all.user.responseDTO';

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

  // get all user data expect current user
  @UseGuards(IsAuthenticated)
  @Query(() => AllUserResponseDTO)
  async getAllUserData(@User() user: UserEntity): Promise<AllUserResponseDTO> {
    const userData: UserEntity[] | [] = await this.userService.getAllUserData(
      user.ID,
    );
    return { AllUserData: userData, CurrentUser: user };
  }
}
