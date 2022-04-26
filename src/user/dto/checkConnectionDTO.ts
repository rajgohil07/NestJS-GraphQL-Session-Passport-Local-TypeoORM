import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckConnectionDTO {
  @Field()
  connectionStatus: string;
}
