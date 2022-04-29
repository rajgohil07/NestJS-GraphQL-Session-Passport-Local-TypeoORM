import passport from 'passport';
import session, { SessionOptions } from 'express-session';
import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sessionConfig } from './config/session.config';

dotenv.config();

const startServer = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(session(sessionConfig as SessionOptions));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3001);
  console.log(`Server has started on the URL: ${await app.getUrl()}`);
};

startServer();
