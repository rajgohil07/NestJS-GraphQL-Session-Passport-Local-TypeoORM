import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/createinput';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(Email: string, Password: string) {
    return await this.userService.userLogin({ Email, Password });
  }

  async login(loginInput: LoginInput) {
    return await this.userService.userLogin(loginInput);
  }
}
