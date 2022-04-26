import { Query, Resolver } from '@nestjs/graphql';
import { CheckConnectionDTO } from './dto/checkConnectionDTO';

@Resolver()
export class UserResolver {
  @Query(() => CheckConnectionDTO)
  checkServer(): CheckConnectionDTO {
    return { connectionStatus: 'connected with graphql' };
  }
}
