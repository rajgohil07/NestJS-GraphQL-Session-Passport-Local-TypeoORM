import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GQLAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const {
      LoginInput: { Email, Password },
    } = ctx.getArgs();
    gqlReq.body.Email = Email;
    gqlReq.body.Password = Password;
    console.log('in a get request\n\n\n');
    return gqlReq;
  }
}
