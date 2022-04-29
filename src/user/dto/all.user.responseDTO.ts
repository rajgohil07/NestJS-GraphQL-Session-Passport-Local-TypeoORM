import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class getAttributesAllUser {
  @Field(() => Int)
  ID: number;

  @Field()
  Email: string;

  @Field()
  Name: string;
}

@ObjectType()
export class AllUserResponseDTO {
  @Field(() => getAttributesAllUser)
  CurrentUser: getAttributesAllUser;

  @Field(() => [getAttributesAllUser] || [])
  AllUserData: getAttributesAllUser[];
}
