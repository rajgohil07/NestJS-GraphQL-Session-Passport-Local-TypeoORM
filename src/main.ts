import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

dotenv.config();

const startServer = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'qid',
      secret: 'SESSION_SECRET',
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    }),
  );
  await app.listen(process.env.PORT || 3001);
  console.log(`Server has started on the URL: ${await app.getUrl()}`);
};

startServer();
