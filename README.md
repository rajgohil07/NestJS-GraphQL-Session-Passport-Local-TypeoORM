# Description

This is a basic project that shows how to use the nestjs passport local strategy, along with graphql and express sessions.

## Installation

```bash
npm install
```

## keywords

- NestJS
- GraphQL
- Express-Session
- Passport
- Passport local strategy
- TypeORM

## Installed modules for local passport strategy

- passport
- passport-local
- express-session
- @nestjs/passport
- @types/passport-local
- @types/express-session

## Steps to implement passport local strategy along with graphql

1.Create AuthGuard which take context from GraphQL and assign our Email and Password to req.body, because passport automatically gets your credentials from req.body but incase of graphql execution context is different so you have to manually set your args in req.body and for that getRequest method is used.

```bash
# example
 getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const {
      LoginInput: { Email, Password },
    } = ctx.getArgs();
    gqlReq.body.Email = Email;
    gqlReq.body.Password = Password;
    return gqlReq;
  }
```

2.Export the class which extends the `PassportStrategy` with Strategy argument(inherited from passport-local module) and call super() method.you can even specify the usernameField and passwordField inside the super method.

```bash
#example
 constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'Email',
      passwordField: 'Password',
    });
  }
```

3.After that call the validate method inside the class.

4.After that we need to call serializeUser and deserializeUser method to store the user data into the session.

5.To call serializeUser method we need to create new AuthGuard which will take request and pass it to the passport logIn method.

```bash
#example
@Injectable()
export class SessionLocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctxRequest = GqlExecutionContext.create(context).getContext().req;
    await super.logIn(ctxRequest);
    return ctxRequest ? true : false;
  }
}

```

6.After that we need to call both guards in the login query/mutation by adding @UseGuards() decorator.

```bash
# example
  @Query(() => LoginResponse)
  @UseGuards(GQLAuthGuard, SessionLocalAuthGuard)
  login(
    @Args('LoginInput') loginInput: LoginInput,
    @User() user: UserEntity,
  ): LoginResponse {
    return {
      LoginSuccessMessage: constant.LOGIN_SUCCESSFUL,
      CurrentUser: user,
    };
  }
```

7.On successful login we can retrieve the current user by req.user we can even create custom decorator for that too, for that [please visit here](https://docs.nestjs.com/security/authentication#graphql 'please visit here title').

8.We can even implement new Guard to authenticate the user, for that we can do something like this.

```bash
@Injectable()
export class IsAuthenticated implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const ctxReq = GqlExecutionContext.create(context).getContext().req;
    const AuthenticationStatus = ctxReq.isAuthenticated();
    if (!AuthenticationStatus) {
      throw new UnauthorizedException(constant.UNAUTHORIZED_ACCESS_MESSAGE);
    }
    return AuthenticationStatus;
  }
}
```

9.And then we can call that guard on every query/mutation something like this

```bash
@UseGuards(IsAuthenticated)
  @Query(() => AllUserResponseDTO)
  async getAllUserData(@User() user: UserEntity): Promise<AllUserResponseDTO> {
    const userData: UserEntity[] | [] = await this.userService.getAllUserData(
      user.ID,
    );
    return { AllUserData: userData, CurrentUser: user };
  }
```

## Query

```bash
# to check connection
query {
  checkServer {
    connectionStatus
  }
}

# to login the user
query {
  login(
    LoginInput: { Email: "raj.famous009@gmail.com", Password: "123123Raj!" }
  ) {
    LoginSuccessMessage
    CurrentUser {
      ID
      Name
      Email
    }
  }
}

# get all user listing after the authorization
query {
  getAllUserData {
    CurrentUser {
      ID
      Email
      Name
    }
    AllUserData {
      ID
      Email
      Name
    }
  }
}


```

## Mutation

```bash
# user register functionality
mutation {
  createUser(
    UserCreateObject: {
      Name: "Raj Gohil"
      Email: "raj.famous009@gmail.com"
      Password: "123123Raj!"
    }
  ) {
    ID
    Name
    Email
  }
}

```

## Useful links

```bash

# passport along with GraphQl
https://docs.nestjs.com/security/authentication#graphql

#create custom decorator using GraphQL
https://docs.nestjs.com/security/authentication#graphql

# session with local strategy
https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4

# stack overflow link if you got 401 unauthorize every single time
https://stackoverflow.com/questions/68390441/nestjs-graphql-passport-getting-unauthorised-error-from-guard
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
