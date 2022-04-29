import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { comparePassword } from 'src/common/helper';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validateUser(Email: string, Password: string): Promise<UserEntity> {
    const lowerEmail = Email.toLowerCase();
    const findUserData = await this.userRepository.findOne({
      where: {
        Email: lowerEmail,
      },
      select: ['ID', 'Email', 'Name', 'Password'],
    });
    if (!findUserData) {
      throw new NotFoundException(constant.EMAIL_NOT_FOUND);
    }
    const IsValidPassword = await comparePassword(
      Password,
      findUserData.Password,
    );
    if (!IsValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }
    delete findUserData.Password;
    return findUserData;
  }
}
