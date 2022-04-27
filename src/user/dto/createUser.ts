import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field()
  Name: string;

  @Field()
  Email: string;

  @Field()
  Password: string;
}
