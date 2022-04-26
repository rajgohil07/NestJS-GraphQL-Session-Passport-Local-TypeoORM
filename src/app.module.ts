import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSource } from './config/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(PostgresDataSource), UserModule],
})
export class AppModule {}
