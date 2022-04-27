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
    return ctx.getContext().req;

    // const ctx = GqlExecutionContext.create(context);
    // const request = ctx.getContext().req;
    // const { LoginInput } = ctx.getArgs();
    // request.body = LoginInput;
    // return request;
  }
}
