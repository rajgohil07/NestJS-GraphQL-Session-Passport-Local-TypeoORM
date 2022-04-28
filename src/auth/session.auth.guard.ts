import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionLocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctxReques = GqlExecutionContext.create(context).getContext().req;
    console.log(ctxReques, 'ctxReques\n\n\n');
    await super.logIn(ctxReques);
    return true;
  }
}
