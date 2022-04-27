import { Context, Query, Resolver } from '@nestjs/graphql';
import { CheckConnectionDTO } from './dto/checkConnectionDTO';

@Resolver()
export class UserResolver {
  @Query(() => CheckConnectionDTO)
  checkServer(@Context() ctx: any): CheckConnectionDTO {
    ctx.req.session.UserID = 'raj';
    return { connectionStatus: 'connected with graphql' };
  }

  @Query(() => CheckConnectionDTO)
  checkSession(
    @Context('session') session: any,
    @Context('req') req: any,
  ): CheckConnectionDTO {
    console.log(req, '\n\n\n ctx is here');
    console.log(session, '\n\n\n ctx is here');
    return { connectionStatus: 'connected with graphql' };
  }
}
