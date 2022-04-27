import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'Email' });
  }

  async validate(Email: string, password: string): Promise<any> {
    console.log('here om in local');
    return await this.authService.validateUser(Email, password);
  }
}
