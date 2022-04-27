import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  Email: string;

  @Field()
  Password: string;
}
