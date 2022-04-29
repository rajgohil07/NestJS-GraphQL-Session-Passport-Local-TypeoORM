import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  Email: string;

  @Field({ nullable: false })
  Password: string;
}
