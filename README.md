# Description

This is a basic project that shows how to use the nestjs passport local strategy, along with graphql and express sessions.

## keywords

* NestJS
* GraphQL
* Express-Session
* Passport
* Passport local strategy
* TypeORM

## Installation

```bash
npm install
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

## Installed modules for local passport strategy

* passport
* passport-local
* express-session
* @nestjs/passport
* @types/passport-local
* @types/express-session

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
