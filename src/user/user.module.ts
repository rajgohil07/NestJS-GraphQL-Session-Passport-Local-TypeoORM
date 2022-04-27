import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLConfig } from 'src/config/graphql.config';
import { UserEntity } from 'src/entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    GraphQLModule.forRoot(GraphQLConfig),
  ],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
