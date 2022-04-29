import dotenv from 'dotenv';
import { SessionOptions } from 'express-session';

dotenv.config();

export const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 },
};
