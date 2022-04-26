import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config();

const startServer = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3001);
  console.log(`Server has started on the URL: ${await app.getUrl()}`);
};

startServer();
