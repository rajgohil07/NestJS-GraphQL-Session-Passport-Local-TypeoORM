import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { constant } from './constant';

dotenv.config();

export interface IGenerateToken {
  ID: number;
  Name: string;
  Email: string;
}

const hashPassword = (plainPassword: string) =>
  bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);

const comparePassword = (plainPassword: string, hasPassword: string) =>
  bcrypt.compare(plainPassword, hasPassword);

export { hashPassword, comparePassword };
