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
    console.log('gqlReq\n\n\n', gqlReq);
    const {
      LoginInput: { Email, Password: password },
    } = ctx.getArgs();
    gqlReq.body.Email = Email;
    gqlReq.body.password = password;
    return gqlReq;
  }
}
