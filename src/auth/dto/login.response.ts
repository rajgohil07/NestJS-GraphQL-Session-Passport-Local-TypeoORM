import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/entity/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  LoginSuccessMessage: string;

  @Field(() => UserEntity)
  CurrentUser: UserEntity;
}
