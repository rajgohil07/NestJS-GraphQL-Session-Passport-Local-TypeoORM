import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'Email' });
  }

  async validate(
    Email: string,
    password: string,
    done: CallableFunction,
  ): Promise<any> {
    console.log('here om in local');
    try {
      const userData = await this.authService.validateUser(Email, password);
      return done(null, userData);
      return userData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
