import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Context } from 'apollo-server-core';
import { join } from 'path';

export const GraphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  debug: true,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: {
    settings: {
      'editor.theme': 'light',
      'request.credentials': 'include',
    },
  },
  context: ({ req }): Context => ({ session: req.user }),
};
