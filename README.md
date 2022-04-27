# Installation

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
* @nestjs/passport
* @types/passport-local

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
